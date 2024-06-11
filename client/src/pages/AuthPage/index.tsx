import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../state/authSlice';
import { useNavigate } from 'react-router';

type FormValues = {
    email: string
    password:string
}


const AuthPage = ({ login }: { login?: boolean }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const pageTitle = login ? 'Login to your account' : 'Create an account';
    const submitButtonText = login ? 'Login' : 'Sign up';

    const onSubmit: SubmitHandler<FormValues> = async (data: { email: string; password: string }) => {
        try {
            const response = await axios.post(login ? 'http://localhost:3001/api/auth/signin' : 'http://localhost:3001/api/auth/signup', data);
            dispatch(loginSuccess(response.data));
            navigate('/projects');
        } catch (error) {
            console.error(error); 
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-orange-400 md:text-lg">
                    TASK MANAGER
                </h2>
                <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                    {pageTitle}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                {...register("email", { required: true })}
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <p className="text-red-500">Email is required</p>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...register("password", { required: true })}
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <p className="text-red-500">Password is required</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {submitButtonText}
                        </button>
                    </div>
                </form>
                {
                    login ? 
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Register
                            </a>
                        </p> :
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Have an account?{' '}
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Login
                            </a>
                        </p>
                        
                }
                
            </div>
        </div>
    );
};

export default AuthPage;
