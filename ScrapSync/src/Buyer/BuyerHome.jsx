import React from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; 
import { useContext } from 'react';
import { Authcontext } from '../App';
export default function BuyerHome() {
  let { user, setUser } = useContext(Authcontext);

  return (
    <div>BuyerHome</div>
  )
}
