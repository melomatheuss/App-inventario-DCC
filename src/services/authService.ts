/*import {AuthData} from "../contexts/Auth"

async function signIn(email: string, password: string): Promise<AuthData>{

    return new Promise<AuthData>((resolve, reject) => {
        setTimeout(() => {
            if(password === '123456'){
                resolve({
                    token: 'fake-token',
                    email,
                    name: 'Matheus Melo',
                });
            } else {
                reject(new Error('Credenciais inválidas'));
            }
        }, 1000);
    });
}

export const authService = {signIn};

*/