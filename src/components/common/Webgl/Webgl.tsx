const WebGLViewer = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src="/webgl/index.html"
        style={{
          width: '90%',
          height: '1100px',
          border: 'none',
          maxWidth: "100%",
        }}
        title="WebGL Viewer"
      />
    </div>
  );
};

export default WebGLViewer;
