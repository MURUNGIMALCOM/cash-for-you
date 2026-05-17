import { useState, useEffect } from "react"
import { auth } from "./firebase"
import { db } from "./firebase"

import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

export default function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [loggedIn, setLoggedIn] = useState(
  JSON.parse(localStorage.getItem("loggedIn")) || false
)
  const [loans, setLoans] = useState([])
const [amount, setAmount] = useState("")
const [period, setPeriod] = useState("1 Month")
const [purpose, setPurpose] = useState("")
const [activeLoan, setActiveLoan] = useState(0)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [darkMode, setDarkMode] = useState(true)
useEffect(() => {

  const fetchLoans = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "loans")
      )

      const loanData = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()

if (
  currentUser &&
  data.userId === currentUser.uid
) {
  loanData.push(data)
}
      })

      setLoans(loanData)

    } catch (error) {
      console.log(error)
    }
  }

  fetchLoans()

}, [])
const [currentUser, setCurrentUser] = useState(null)
useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {

      if (user) {

  setCurrentUser(user)

  if (user.email === "admin@gmail.com") {
    setIsAdmin(true)
  } else {
    setIsAdmin(false)
  }
}
    }
  )

  return () => unsubscribe()

}, [])
const [isAdmin, setIsAdmin] = useState(false)

  // DASHBOARD SCREEN
  
  if (loggedIn) {
    return (
     <div
  style={{
    display: "flex",
    minHeight: "100vh",
    background: "#050816",
    color: "white",
    fontFamily: "Arial"
  }}
>
  {/* SIDEBAR */}
<div
  style={{
    width: "220px",
    background: "#0F172A",
    padding: "30px 20px"
  }}
>
  <h2 style={{ color: "violet" }}>
    Cash For You
  </h2>

  <div style={{ marginTop: "40px" }}>
    <p style={{ marginBottom: "20px", cursor: "pointer" }}>
      Dashboard
    </p>

    <p style={{ marginBottom: "20px", cursor: "pointer" }}>
      Loans
    </p>

    <p style={{ marginBottom: "20px", cursor: "pointer" }}>
      Payments
    </p>

    <p style={{ marginBottom: "20px", cursor: "pointer" }}>
      Settings
    </p>
  </div>
</div>
<div style={{ flex: 1, padding: "40px" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>
              Cash For You
            </h1>

            <p style={{ color: "#aaa" }}>
              Welcome back, Malcolm
            </p>
          </div>

          <button
            onClick={() => {
  setLoggedIn(false)
  localStorage.setItem("loggedIn", false)
}}
            style={{
              background: "purple",
              border: "none",
              color: "white",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
        <div
  style={{
    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "25px",
    color: "white"
  }}
>
  <h2 style={{ margin: 0 }}>Welcome back 👋</h2>
  <p style={{ marginTop: "5px", opacity: 0.8 }}>
    Manage your loans and repayments in one place
  </p>
</div>


        {/* CARDS */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >
          {/* BALANCE */}
          <div
  style={{
    background: "linear-gradient(135deg, #1E293B, #0F172A)",
    padding: "25px",
    borderRadius: "24px",
    width: "280px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    transition: "0.3s",
    border: "1px solid rgba(255,255,255,0.05)"
  }}
>
            <p
  style={{
    color: "#94A3B8",
    fontSize: "14px",
    letterSpacing: "1px"
  }}
>
              Available Balance
            </p>

            <h2
  style={{
    fontSize: "32px",
    marginTop: "10px"
  }}
>
  UGX 2,400,000
</h2>
          </div>

          {/* LOAN */}
          <div
  style={{
    background: "linear-gradient(135deg, #1E293B, #0F172A)",
    padding: "25px",
    borderRadius: "24px",
    width: "280px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    transition: "0.3s",
    border: "1px solid rgba(255,255,255,0.05)"
  }}
>
            <p
  style={{
    color: "#94A3B8",
    fontSize: "14px",
    letterSpacing: "1px"
  }}
>
              Active Loan
            </p>

            <h2>UGX {activeLoan}</h2>
          </div>

          {/* SCORE */}
        <div
  style={{
    background: "linear-gradient(135deg, #1E293B, #0F172A)",
    padding: "25px",
    borderRadius: "24px",
    width: "280px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    transition: "0.3s",
    border: "1px solid rgba(255,255,255,0.05)"
  }}
>
            <p
  style={{
    color: "#94A3B8",
    fontSize: "14px",
    letterSpacing: "1px"
  }}
>
              Credit Score
            </p>

            <h2>742</h2>
          </div>
        </div>

       {/* LOAN APPLICATION */}
<div
  style={{
    marginTop: "40px",
    background: "#111827",
    padding: "30px",
    borderRadius: "20px",
    maxWidth: "500px"
  }}
>
  <h2 style={{ marginBottom: "25px" }}>
    Apply For Loan
  </h2>

  {/* AMOUNT */}
  <div style={{ marginBottom: "20px" }}>
    <label>Loan Amount</label>

   <input
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  type="text"
  placeholder="Enter amount"
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    borderRadius: "12px",
    border: "none",
    background: "#1F2937",
    color: "white"
  }}
/>
  </div>

  {/* PERIOD */}
  <div style={{ marginBottom: "20px" }}>
    <label>Repayment Period</label>
<select
  value={period}
  onChange={(e) => setPeriod(e.target.value)}
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    borderRadius: "12px",
    border: "none",
    background: "#1F2937",
    color: "white"
  }}
>
      <option>1 Month</option>
      <option>3 Months</option>
      <option>6 Months</option>
      <option>12 Months</option>
    </select>
  </div>

  {/* PURPOSE */}
  <div style={{ marginBottom: "20px" }}>
    <label>Purpose</label>

  <textarea
  value={purpose}
  onChange={(e) => setPurpose(e.target.value)}
  placeholder="Why do you need this loan?"
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    borderRadius: "12px",
    border: "none",
    background: "#1F2937",
    color: "white",
    height: "100px"
  }}
/>
  </div>

  {/* BUTTON */}
<button
onClick={async () => {
  const newLoan = {
    userId: currentUser.uid,
    amount: Number(amount),
    remaining: Number(amount),
    period,
    purpose,
    status: "Pending"
  }
  try {
  await addDoc(
    collection(db, "loans"),
    newLoan
  )

  console.log("Loan saved!")

} catch (error) {
  console.log(error)
}

  setLoans([...loans, newLoan])

  // update active loan automatically
  setActiveLoan((prev) => prev + Number(amount))

  setAmount("")
  setPeriod("1 Month")
  setPurpose("")

  alert("Loan Application Submitted!")
}}
  style={{
    width: "100%",
    padding: "15px",
    background: "purple",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer"
  }}
>
  Submit Application
</button>
</div>
        <div style={{ marginTop: "40px" }}>
  <h2>Loan History</h2>

  {loans.length === 0 ? (
    <p style={{ color: "#aaa" }}>No loans yet</p>
  ) : (
    loans.map((loan, i) => (
 <div
  style={{
    background: "linear-gradient(135deg, #1E293B, #0F172A)",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
  }}
>
<div style={{ marginBottom: "10px" }}>
    <p>Amount: UGX {loan.amount}</p>
    <p>Period: {loan.period}</p>
    <p>Status: {loan.status}</p>
    <p>
  Remaining: UGX {loan.remaining}
</p>
</div>
{!isAdmin &&
 loan.status === "Approved" &&
 loan.remaining > 0 && (

  <button
    onClick={() => {

      const updated = [...loans]

      updated[i].remaining -= 50000

      if (updated[i].remaining <= 0) {

        updated[i].remaining = 0

        updated[i].status = "Completed"
      }

      setLoans(updated)

      setActiveLoan(
        (prev) => Math.max(prev - 50000, 0)
      )
    }}

    style={{
      marginTop: "10px",
      background: "orange",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    Pay UGX 50,000
  </button>
)}

    {/* ADMIN BUTTONS */}
    {isAdmin && (
    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
      
      <button
        onClick={() => {
          const updated = [...loans]
          updated[i].status = "Approved"
          setLoans(updated)
        }}
        style={{
          background: "green",
          color: "white",
          border: "none",
          padding: "8px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Approve
      </button>

      <button
        onClick={() => {
          const updated = [...loans]
          updated[i].status = "Rejected"
          setLoans(updated)
        }}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "8px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Reject
      </button>
    </div>
    )}
  </div>
))
  )}
</div>
</div>
      </div>
    )
  }
  // LOGIN / REGISTER SCREEN
  return (
    <div
      style={{
        backgroundColor: "#050816",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        color: "white"
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          boxShadow: "0 0 30px rgba(128,0,128,0.3)"
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "38px"
          }}
        >
          Cash For You
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            marginBottom: "30px"
          }}
        >
          {isLogin ? "Welcome back" : "Create your account"}
        </p>

        {/* FULL NAME */}
        {!isLogin && (
          <div style={{ marginBottom: "20px" }}>
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "8px",
                borderRadius: "12px",
                border: "none",
                background: "#1F2937",
                color: "white"
              }}
            />
          </div>
        )}

        {/* EMAIL */}
        <div style={{ marginBottom: "20px" }}>
          <label>Email</label>

          <input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  placeholder="Enter your email"
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    borderRadius: "12px",
    border: "none",
    background: "#1F2937",
    color: "white"
  }}
/>
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "25px" }}>
          <label>Password</label>

          <input
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  type="password"
  placeholder="Enter your password"
  style={{
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    borderRadius: "12px",
    border: "none",
    background: "#1F2937",
    color: "white"
  }}
/>
        </div>

        {/* BUTTON */}
        <button
  onClick={async () => {
    try {
      if (isLogin) {
        // LOGIN
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        alert("Login successful!")
      } else {
        // REGISTER
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        alert("Account created!")
      }

      setLoggedIn(true)
      localStorage.setItem("loggedIn", true)

    } catch (error) {
      alert(error.message)
    }
  }}
          style={{
            width: "100%",
            padding: "15px",
            background: "purple",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* SWITCH */}
        <p
  onClick={() => setIsLogin(!isLogin)}
  style={{
    textAlign: "center",
    marginTop: "20px",
    color: "#aaa",
    cursor: "pointer"
  }}
>
  {isLogin
    ? "Don’t have an account? Register"
    : "Already have an account? Login"}
</p>
      </div>
    </div>
  )
}