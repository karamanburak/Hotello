
interface IAuthImageProps {
    image: string;
}

const AuthImage: React.FC<IAuthImageProps> = ({ image }) => {
    return (

        <div className='hidden md:block w-1/2 3xl:h-[60vh] xl:w-[40vw] h-[100%]'>
            <img src={image} alt="image" className='w-full h-full rounded-md object-cover' />
        </div>
    )
};

export default AuthImage;
