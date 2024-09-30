import signUp from '../assets/signUp.png';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
    return (
        <>
            <div className='sm:flex justify-between items-stretch py-8 px-4 lg:px-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text font-nunito gap-6 xl:gap-0'>
                <div className='hidden md:block w-1/2 h-full md:h-auto xl:w-[40vw]'>
                    <img src={signUp} alt="sign-up image" className='w-full h-full rounded-md object-cover' />
                </div>
                <div className='w-full md:w-1/2 flex items-center'>
                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;
