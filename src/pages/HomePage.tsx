import Button from "../components/Button"
import SearchBar from "../components/Search"
import { useAuth } from "../context/AuthContext"
import Dashboard from "./Dashboard"


const HomePage = () => {
  const { signIn, currentUser } = useAuth();

  return (
    <>
      {currentUser ? <Dashboard /> : <div className="pt-3">
        <SearchBar />
        <div className="flex flex-col md:flex-row items-center justify-center gap-y-5 gap-10 mt-16 mb-5">
          <Button style="secondary" disabled={false} onClick={() => { }}>
            Scan QR to download PPT.
          </Button>

          <Button style="primary" disabled={false} onClick={signIn}>
            Sign in with Google
          </Button>
        </div>

        <p className="text-center">
          Use Institute e-mail id for signin.
        </p>
      </div>}
    </>
  )
}

export default HomePage;