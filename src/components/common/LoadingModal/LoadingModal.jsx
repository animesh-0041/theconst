import { Model } from "../Model/Model"
import { useUser } from "../../../Providers/UseContent";
import { Loading } from "../Loading/Loading";



export const LoadingModal = () => {
    const { isloadingModel, closeLoadingModel } = useUser();


    return (
        <Model
            isOpen={isloadingModel}
            closeModel={closeLoadingModel}
            type={'blank-loading'}
        >
            <Loading type={'loading-modal'} />
        </Model>
    )
}