import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Statistic } from "../../components/Helper/Tools"
import { postFollow } from "../../service/quiries/UserAuth";
import { useErrorHandler } from "../../components/Helper/StatusManager";
import { CountConverter } from "../../components/common/CountConverter/CountConverter";



export const ProfileBanner = ({ id, user, myprofile, name, image, profileData }) => {
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();


    const {
        mutateAsync: followAuthor,
    } = useMutation({
        mutationFn: postFollow,
        onSuccess: (data) => {
            profileData.isFollowing = data?.status;
            queryClient.invalidateQueries({ queryKey: ["getprofiledata", user] });
        },
        onError: (error) => {
            profileData.isFollowing = !profileData?.isFollowing
            handleError(error);
        },
    });


    const handleFollow = async () => {
        if (!id) return;

        profileData.isFollowing = !profileData?.isFollowing

        try {
            await followAuthor({ "followUserId": id });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <img
                className='block w-[100px] h-[100px] object-cover rounded-full border-4 border-black-50 hover:border-black-200 transform transition duration-300 ease-in-out cursor-pointer'
                src={image || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
            />

            {myprofile ?
                <>
                    <div className='w-fit flex flex-row gap-8'>
                        <Statistic title={'Followers'} value={CountConverter(profileData?.followersCount) || '0'} />
                        <Statistic title={'Post'} value={'192'} />
                        <Statistic title={'Following'} value={CountConverter(profileData?.followingCount) || '0'} />
                    </div>
                </>
                :
                <>
                    <h2 className='font-Golos font-semibold text-sm leading-5 text-black-700'>{name || 'Author'}</h2>

                    <div className='w-fit flex flex-row items-center gap-2'>
                        <button onClick={handleFollow} className='w-fit px-10 py-2 font-Golos text-xs font-normal whitespace-nowrap capitalize rounded-full text-black-25 bg-black-900'>
                            {profileData?.isFollowing ? "following" : "follow"}
                        </button>
                        <div className='w-fit px-3 py-2 font-Golos text-xs font-normal whitespace-nowrap capitalize rounded-full text-black-900 border border-black-900'>
                            {CountConverter(profileData?.followersCount) || '0'}
                        </div>
                    </div>

                </>
            }
            <p className='max-w-[400px] font-Golos font-normal text-center text-xs leading-5 text-black-500'>
                Passionate blogger sharing insights on travel, tech, and lifestyle. Join me on a journey of discovery, tips, and inspiration. Let's explore together!
            </p>
        </div>
    )
}