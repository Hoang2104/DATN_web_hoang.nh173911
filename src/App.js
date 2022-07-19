import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                {/* Hiển thị các trang theo url */}
                <AppRouter />
                {/* Thông báo */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </AuthProvider>
        </BrowserRouter>
    );
};
export default App;
