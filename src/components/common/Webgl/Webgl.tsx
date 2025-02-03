import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../utils/hooks";

const WebGLViewer = () => {
   const token = useAppSelector((state: RootState) => state.user.token);
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src={`/webgl/index.html?token=` + token}
        style={{
          width: '90%',
          height: '1000px',
          border: 'none',
          maxWidth: "100%",
          display: "flex",
          margin: '100px auto 0px',
        }}
        title="WebGL Viewer"
      />
    </div>
  );
};

export default WebGLViewer;
