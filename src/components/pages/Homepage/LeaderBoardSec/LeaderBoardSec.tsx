import { Container } from "react-bootstrap";
import { clsx } from "../../../../utils/utils";
import "./LeaderBoardSec.scss";
import Button from "../../../common/Button/Button";

const LeaderBoardSec = () => {
    // const settings: Settings = {
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     dots: false,
    //     arrows: true,
    //     infinite: false,
    //     responsive: [
    //         {
    //             breakpoint: 1199,
    //             settings: {
    //                 slidesToShow: 3,
    //             },
    //         },
    //         {
    //             breakpoint: 767,
    //             settings: {
    //                 slidesToShow: 2,
    //             },
    //         },
    //         {
    //             breakpoint: 575,
    //             settings: {
    //                 slidesToShow: 1,
    //             },
    //         },
    //     ]
    // }
    // const data = [
    //     { title: "Current  Week", value: "24th Nov. - 30th Nov, ‘24 " },
    //     { title: "Week No. 47", value: "17th Nov. - 23rd Nov, ‘24 " },
    //     { title: "Week No. 46", value: "10th Nov. - 16th Nov, ‘24 " },
    //     { title: "Week No. 45", value: "3rd Nov. - 9th Nov, ‘24 " },
    //     { title: "Week No. 44", value: "20th Oct. - 3rd Nov, ‘24 " },
    // ]
    return (
        <section className={clsx("leaderboard_sec")}>
            <Container>
                <h2>Boost Your Rewards, Elevate Your Game!</h2>
                <p>Start with 10,000 KRZ – Whatever you earn beyond this converts into real KRZ at the end of the testnet.</p>
                <Button>Climb the leaderboard – The higher you rank, the bigger your final rewards.</Button>
                {/* {!hideheading && <h2 className="title_txt">Leaderboard</h2>}
                <Slider {...settings}>
                    {
                        data.map((item, index) => {
                            return (
                                <div key={item.title + index} className="leaderboard_card">
                                    <h3>{item.title}</h3>
                                    <p>{item.value}</p>
                                </div>
                            )
                        })
                    }
                </Slider>
                <div className="your_score_card">
                    <h3>Multiply your score from the week. Every Week.</h3>
                    <p>Ranking in The Top 500 for the Weekly Leaderboard gives you extra KRZ amount. <br /> The Higher you Rank - the bigger bonus score you get.</p>
                    <h4>Your Score</h4>
                    <h2>3768</h2>
                </div> */}
            </Container>
        </section>
    )
}

export default LeaderBoardSec
