export const responseHandler=(response)=>{
     if(response.status=== 401){
        return "invalid credentials"
      }else if(response.status === 200){
        return "change password success"
      }else{
          return "something went wrong"
      }
}
 