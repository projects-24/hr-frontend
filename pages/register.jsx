import Link from "next/link";

export default function Register() {
const handleLogin = () => {
window.location.assign("/dashboard");
};
return (
<div>
<div className="">
<div className="central loginLeft gradient">
<img src="/connect.svg" className="fit" alt="" />
</div>
<div className="loginRight central">
<div className="form">
<div className="m-section">
    <div className="h1">Register Account</div>
    <div className="text-bold">
    Enter a valid email and password to login your account
    </div>
</div>
<div className="section">
    <div className="row">
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name=""
        className="input"
        id=""
        placeholder="Name"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="email"
        name=""
        className="input"
        id=""
        placeholder="Email"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="tel"
        name=""
        className="input"
        id=""
        placeholder="Contact"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name=""
        className="input"
        id=""
        placeholder="Post"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name=""
        className="input"
        id=""
        placeholder="Directorate"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name=""
        className="input"
        id=""
        placeholder="Section"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
        <input
        type="text"
        name=""
        className="input"
        id=""
        placeholder="Position"
        />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
    <button className="primaryBtn btn full-width" onClick={handleLogin}>CREATE ACCOUNT</button>
    </div>
    </div>
</div>
</div>
</div>
</div>
</div>
);
}
