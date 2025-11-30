"use server"

import { redirect } from "next/navigation";
import { FormState, SigninFormSchema, SignupFormSchema } from "./type";
import { BACKEND_URL } from "./constants";
import { createSession } from "./session";
import axios from "axios";

// export async function signUp
//     (
//     state:FormState,
//     data:FormData  
//     ) :Promise<FormState>{

//         const validationFields = SignupFormSchema.safeParse({
//         name: data.get("name"),
//         email: data.get("email"),
//         password: data.get("password")
//     });

//     if(! validationFields.success){
//         return {
//             error: validationFields.error.flatten().fieldErrors,    
//         };
//     }


//     const response = await fetch(`${BACKEND_URL}/auth/signup`,{
//         method: "POST",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body:JSON.stringify(validationFields.data)
//     });

//     console.log(validationFields.data)

//     if(response.ok){
//         redirect("/auth/signin")
//     }

//     else{
//         return {
//             message:
//             response.status===409?"The user is already existed!":response.statusText
//         }
//     }
// }


export async function signIn(
    state: FormState,
    data: FormData
): Promise<FormState> {

    const validationFields = SigninFormSchema.safeParse({
        email: data.get("email"),
        password: data.get("password")
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
        }
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/signin`, validationFields.data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200 || response.status === 201) {
            const result = response.data;

            //Creating the session for authenticated user
            await createSession({
                user: {
                    id: result.id,
                    name: result.name
                },
                accessToken: result.token,
            });
            console.log(result)
            redirect('/');
        }
    } catch (error: any) {
        if (error.response) {
            return {
                message: error.response.status === 401 ? "Invalid email or password" : error.response.statusText
            }
        }
        return {
            message: "An error occurred"
        }
    }

}