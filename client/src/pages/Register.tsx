import React, { useState } from "react";
import type { RegisterData } from "../types/auth.types";

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Register clicked!");
        e.preventDefault();

        const data: RegisterData = { name, email, password };
        console.log(
            data
        )
    }
    return (
        <div>
            <h1>Create your LifeVault account</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password </label>
                    <input type="text" id="password" placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>

                <button type="submit"
                    onClick={() => alert("BUTTON CLICKED")}
                >Register</button>
            </form>

        </div>
    )
}


export default Register;