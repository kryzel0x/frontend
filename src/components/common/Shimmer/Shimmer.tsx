import { clsx } from '../../../utils/utils';
import "./Shimmer.scss";

type PropTypes = {
    className?: string,
}

const Shimmer = ({ className }: PropTypes) => {
    return (
        <div className={clsx("shimmer", className)}>
            <span></span>
        </div>
    )
}

export default Shimmer
