import axios, { AxiosError, HttpStatusCode } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Container } from "react-bootstrap";
import toast from "react-hot-toast";
import nivapay from "../../../../assets/images/Nivapay-LogoWordmark.png";
import aptos from "../../../../assets/images/aptos.png";
import coinband from "../../../../assets/images/coinband.png";
import coin from "../../../../assets/images/powered-by-coin.png";
import quillaudits from "../../../../assets/images/quill-audits.png";
import { clsx, Yup } from "../../../../utils/utils";
import Button from "../../../common/Button/Button";
import "./PoweredBy.scss";
import Error from "../../../common/form/Error/Error";
import { BASE_URL, SOCIAL_MEDIA } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";

type APIResponse = {
  message: string;
  error: boolean;
  statusCode: HttpStatusCode;
  result: {
    email: string;
    requestStatus: string;
    id: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
const Poweredby = ({ showIcon }: { showIcon?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
    }),
    onSubmit: async ({ email }) => {
      setLoading(true);
      try {
        const response = await axios.post<APIResponse>(
          BASE_URL + "/user/invitation-requests",
          { email }
        );
        if (response.data.statusCode === 200) {
          setTimeout(() => {
            setLoading(false);
            toast.success("Thanks for subscribing our newsletter!");
            formik.resetForm();
            // window.open(SOCIAL_MEDIA.TELEGRAM, "_blank")
            // setSubmitted(true);
          }, 1000);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        setLoading(false);
      }
    },
  });
  return (
    <>
      <section className={clsx("powered_by")}>
        {showIcon && <img src={coin} alt="coin" className="coin" />}
        <Container>
          <h3>Powered By</h3>
          <img className="aptos" src={aptos} alt="aptos" />
          <h4>Partners</h4>
          <div className="partners">
            <div>
              <img src={quillaudits} alt="quillaudits" />
            </div>
            <div>
              <img src={nivapay} alt="nivapay" />
            </div>
            <div>
              <img src={coinband} alt="coinband" />
            </div>
          </div>
        </Container>
      </section>
      <section className="join_sec">
        <Container>
          <h3>Join Our Newsletter</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="email_input">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && <Error>{formik.errors.email}</Error>}
            </div>
            <Button
              // disabled={submitted}
              loading={loading}
              type="submit"
              className="secondary_btn"
            >
              Subscribe
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Poweredby;
