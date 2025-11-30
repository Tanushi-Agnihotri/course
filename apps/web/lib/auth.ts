"use server"

import { redirect } from "next/navigation";
import { FormState, SigninFormSchema, SignupFormSchema } from "./type";
import { BACKEND_URL } from "./constants";
import { createSession } from "./session";

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
    state:FormState,
    data:FormData
):Promise<FormState>{

    const validationFields = SigninFormSchema.safeParse({
        email: data.get("email"),
        password: data.get("password")
});

if (!validationFields.success){
    return {
        error: validationFields.error.flatten().fieldErrors,
    }
}

    const response = await fetch(`${BACKEND_URL}/auth/signin`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(validationFields.data)
    });

        if(response.ok){
            const result = await response.json();

            //Creating the session for authenticated user
            await createSession({
                user:{
                    id:result.id,
                    name:result.name
                },
                accessToken: result.token,
            });
            console.log(result)
            redirect('/');
    }

    else{
        return {
            message:
            response.status===401?"Invalid email or password":response.statusText
        }
    }

}