
interface IAuthImageProps {
    image: string;
}

const AuthImage: React.FC<IAuthImageProps> = ({ image }) => {
    return (

        <div className='hidden md:block xl:w-[40vw] h-[100vh]'>
            <img src={image} alt="image" className='w-full max-w-full max-h-full rounded-md object-cover' />
        </div>
    )
};

export default AuthImage;
