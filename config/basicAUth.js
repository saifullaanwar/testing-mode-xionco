
import bcrypt from 'bcrypt';

const cekauthor =async(headercek) =>{
    const bycriptPath="$2b$10$";
    const setBasicAuth ={
        username: 'ujixionco',
        password :'suksesujixionco'
    }//Basic JDJhJDEyJC9VamxKS3R5TzN5SXp4ekhaOTh4eHVRNy5oNHVPS2xrSVkwQnpvQUM0Y0I1bTFQNi80SzNlOiQyYSQxMiRWcjdxR1NHUzh0VmEwNWJmSWR6R0tPcXIyby9JVzJrUEl1OGhiQW1Yb3hQRVdUaGRINlN4Ng==

    const getauthorization = headercek;
    if(!getauthorization){
        return false;
    }
    const encoded = getauthorization.substring(6);
    const decoded =Buffer.from(encoded,'base64').toString('ascii');
    const [userauth,passauth]=decoded.split(':');
    /* console.log({
        userauth:userauth,
        passauth:passauth
    }) */
    const cekuserAuth = await bcrypt.compare(setBasicAuth.username, userauth);
    const cekpassAuth = await bcrypt.compare(setBasicAuth.password, passauth);
    if (cekuserAuth!= true||cekpassAuth!= true) {
        return false;
    }
    return true;
    
}

export default cekauthor;