const User = async ({params} : {params: { id: string}}) => {
  
  const { id } = await params;  

  return ( 
    <>
      User Profile: {id}
    </>
   );
}
 
export default User;