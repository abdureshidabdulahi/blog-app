export default function CreateAcount(){
    return(
        <div className="createAcount-container">
            <div className="create">
                <h3>Create Your Acount</h3>
                <input type="text" placeholder="Your name" className="create-input" name="name"/>
                <input type="email"  placeholder=" Your Email" className="create-input" name="email"/>
                <input type="password" placeholder=" Your pasword" className="create-input" name="password"/>
                 <button className="create-buttonOne">Choose File</button>
                <button className="create-buttonTwo">signup</button>
                <p>already hava an acount? <span className="loginhere">login here</span></p>
            </div>
        </div>
    )
}