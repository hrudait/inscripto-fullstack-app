import axios from 'axios'
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import home from '../images/Home-white.svg';
import plusbutton from '../images/PlusButton.svg';
import menuToggle from '../images/mmtoggle.svg';
import logout from '../images/Logout.svg';
import logo from '../images/logo.svg'
import hamburger from '../images/hamburger.svg'
import tutorial from '../images/Tutorial.svg'

import PhoneInput from 'react-phone-number-input'
import { auth } from './firebase';
function Verify(){

    const [email, setEmail] = useState();
    //check auth
    useEffect(()=>{
        if(!email){
            auth.onAuthStateChanged((user)=>{
              if(!user){
                window.location.href ='/login' 
              }
              else if(!email){
                setEmail(user.email)
              }
            }) 
        }
    },[email])

    const css = `
    *{
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
    }
    body{
        background-color: #3D3D3E;
        height:100vh;
        width:100vw;
        margin: 0;
        padding: 0;
        box-sizing: content-box;
        overflow-x: hidden;
    }
    .header{
        display: flex;
    }
    .mobile-header{
        display: none;
    }
    
    .img{
        display: inline;
    }
    .one{
        width: 50vw;
        display: flex;
    }
    .three{
        width: 50vw;
        display: flex;
        align-items: right;
        justify-content: right;
    }.desktoplogo{
        width: 20vw;
        padding-left: 2vw;
        padding-top: 2vw;
    }
    .credit-container{
        display: flex;
        width: 30vw;
        padding-top: 1vw;
        justify-content: center;
        align-items: center;
        cursor:pointer;
    }
    .credit-container:hover,.home:hover,.tutorial:hover,.signout:hover,.logout-href:hover,.home-href:hover,.tutorial-href:hover{
          opacity: .8;
    }.plus-button{
        padding-left: .75vw;
        height: 2vw;
    }
    nav{
        padding-top: 1vw;
        padding-right: 2vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tutorial-href, .logout-href{
        color: white;
        text-decoration: none;
        font-family: 'Chakra Petch';
        padding-right: 1.5vw;
        font-size: 1.5rem;
    }
    .home-href{
        color: white;
        font-family: 'Chakra Petch';
        padding-right: 1.5vw;
        font-size: 1.5rem;
        text-decoration: none;
    }
    .tutorial, .home, .signout{
        height: 2vw;
        padding-right: .25vw;
    }
    .inputdiv{
        width:100vw;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        
    }
    .full-page-container{
        width:100vw;
        diplay:flex;
        justify-content:center;
        align-items:center;
    }
    
    .account, .entertext,.disclaimer,.disclaimertwo{
        color:white;
        display:block;
        width:100vw;
        text-align:center;
    } 
    .disclaimertwo{
        display:inline;
        font-family:'Sen';
        text-decoration:underline;
        color: #89CED8;
    }
    .entertext{
        font-family:'Sen';
        font-size:1.75rem;
        margin:2vw 0 .5vw;
        font-weight:600
    }
    .disclaimer{
        font-family: 'Sen';
        font-size: 1.25rem;
        margin-bottom:1vw;
    }
    .disclaimertwo{
        font-size:1rem;
    }
    .account{
        font-family:'Chakra Petch';
        font-size: 3rem;
        margin-top:1vw;
        font-weight:600;
        color:#FBFCF4;
    }
    .inputform{
        width: 50vw;
        display:flex;
        justify-content:center;
    }
    .enter, .verify{
        margin-left: 3vw;
        font-family: 'Chakra Petch';
        font-size: 2rem;
        padding: .5vw 1vw;
        background-color: #796EE8 ;
        color: white;
        border: black solid .175vw;
        border-radius: .75vw;
        height:4vw;
        cursor:pointer;
    }
    .enter:hover,.verify:hover{
        opacity:.8;
    }
    .form-select{
        display:inline-block;
        width:20vw;
        wrap:normal;
        white-space:normal;
        height:4vw;
        background-color:#796EE8;
        border:black solid .175vw;
        font-family:'Sen';
        padding-left:1vw;
        color:white;
        border-radius:.5vw;
        margin-right:1vw;
        font-size:1.25rem;
    }
    .form-select option{
        white-space:normal;
    }
    .input-label{
        display:block;
    }
    input{
        display:inline;
        width: 30vw;
        border: .25vw solid #EDEEC9;
        border-radius: .75vw;
        font-family: 'Sen';
        padding-left: .75vw;
        height: 4vw;
        font-size: 2rem;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
    }
    input::placeholder{
        color: #B1B1B2;
    }
    input:focus{
        border-color:#574AE2 ;
        background-color: #DDDBF9;
        outline: none;
    }
    .input-label{
        color:white;
        font-family:'Chakra Petch';
        margin-right:4vw;
    }
    .confirmdiv{
        width:100vw;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        margin-top:3vw;
    }
    .codetext{
        color:white;
        font-family:'Sen';
        font-size:1.5rem;
        margin-bottom:2vw;
    }
    .verification{
        display:block;
        color:white;
        font-family:'sen';
        padding-left:.25vw;
    }
    .searchTerm{
        width:15vw;
    }
    @media (orientation:portrait) {
        .header{
            display: none;
        }
        .mobile-header{
            display: flex;
        }.mobile-header{
            display: flex;
            justify-content: space-between;
        }
        .menuopen{
            height: 8vw;
            padding-top: 3vw;
            padding-left: 3vw;
            box-sizing: content-box;
        }
        .logo{
            padding-top: 2vw;
        }.plus-button{
            height: 5vw;
        }.mobilemenu{
            display: block;
            z-index: 100;
            width: 60vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #3D3D3E;
            border: black solid .5vw;
            border-top-right-radius: 2vw;
            border-bottom-right-radius: 2vw;
        }
        .mmlogouticon,.mmreloadicon,.mmhomeicon,.mmtutorialicon{
            height: 10vw;
        }
        .mmlogouttext,.mmreloadtext,.mmhometext,.mmtutorialtext,.email{
            color: white;
            font-family: 'Chakra Petch';
            font-size: 3rem;
            margin-left:3vw;
        }
        .mmhome,.mmlogout,.mmtutorial,.mmreload{
            display: flex;
            align-items: center;
            margin-left: 12.5vw;
            margin-bottom: 5vw;
        }
        .mmitems{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 60vw;
            height: 100vh;
        }
        .mmbottom{
            width: 60vw;
        }
        .email{
            display: block;
            text-align: center;
            margin-bottom: 5vw;
        }
        .mmtoggle{
            width: 60vw;
            height: 30vh;
            display: flex;
            align-items: center;
            justify-content: right;
        }
        .mmtogglearrow{
            height:10vh;
            margin-right: 3vw;
        }
        .mmtop{
            margin-top:10vw;
        }
        .mmhometext{
            color:#89CED8;
            text-decoration:underline;
        }
        .logo{
            margin-right:2vw;
        }
        .account{
            margin-top:10vw;
            font-size:4rem;
        }
        .entertext{
            margin-top:10vw;
            font-size:2rem;
            width:90vw;
        }
        .disclaimer{
            font-size:1rem;
            width:95vw;
            margin-top:3vw;
        }
        .input-label{
            margin-top:3vw;
            white-space:nowrap;
            font-size:2rem;
            margin-left:22vw;
        }
        .form-select{
            width: 40vw;
            font-size:2rem;
            height:10vw;
            margin-right:3vw;
            margin-left:3vw;
        }
        .inputform{
            display:flex;
            flex-wrap:wrap;
            width:100vw;
        }
        .phoneinput{
            height:10vw;
            width:50vw;
            margin-right:3vw;
            font-size:3rem;
        }
        .enter{
            margin:0;
            font-size:5rem;
            margin-top:5vw;
            width:30vw;
            height:13vw;
            border-width:.5vw;
            border-radius: 2vw;
        }
        .verify{
            margin:0;
            margin-left:2vw;
            font-size:4rem;
            width:25vw;
            height:11.5vw;
            border-width:.5vw;
            border-radius: 2vw;
        }
        .codetext{
            width:80vw;
            text-align:center;
            font-size:3rem;
            margin-top:5vw;
        }
        .verification{
            font-size:2rem;
            width:70vw;
            padding-left:1vw;
            margin-top:3vw;
        }
        .searchTerm{
            width:50vw;
            font-size:4rem;
            height:10vw;
            padding-left:2vw;
        }
    }
    `
    const [phoneNum, setPhoneNum]= useState()
    function sendCode(e){
        e.preventDefault()
        setPhoneNum(`+${e.target.phone.value}${value}`)
        let temp = `+${e.target.phone.value}${value}`
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendverify`,{email:email,phone:temp})
        .then((res)=>{
            if(res.data==="sent"){
                setSent(true)
            }
            else if(res.data==="al"){
                alert("That Number is already in use")
            }
            else{
                alert("Try again or use a different number")
            }  
        })
    }
    function verifyCode(e){
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/verifycode`,{email:email,phone:phoneNum,code:e.target.elements.searchTerm.value})
        .then((res)=>{
            if(res.data==="verified"){
                window.location.href="/verified"
            }
            else{
                alert("code invalid")
            }
        })
    }
    function CodeBox(){
        if(!sent){
            return (<div style={{ display: 'none' }}></div>);
        }
        return(<div className='confirmdiv'>
            <h2 className="codetext">Enter The Code You Received</h2>
            <form onSubmit={verifyCode}>
                <span className='verification'>Verification Code</span>
                <input className = "searchTerm" id="searchTerm" onInput={handleChange2} type="number" title="searchTerm" placeholder="123456"  required/>
                <button type="submit" className='verify'><span className='verifytext'>verify</span></button>
            </form>
            </div>
        )
    }

    function handleChange(event){
        let valuee = event.target.value;
    
        // Remove non-numeric and non-decimal characters
        valuee = valuee.replace(/[^0-9.]/g, '');       
        // Remove decimal points
        // Limit the number of digits to 6
        valuee = valuee.replace(/(\.*)\./g, '$1');        
        // Update the input value
        event.target.value = valuee;
        setValue(valuee)
    }
    function handleChange2(event){
        let valuee = event.target.value;
        // Remove non-numeric and non-decimal characters
        valuee = valuee.replace(/[^0-9.]/g, '');       
        // Remove decimal points
        // Limit the number of digits to 6
        valuee= valuee.slice(0,6)
        valuee = valuee.replace(/(\.*)\./g, '$1');        
        // Update the input value
        event.target.value = valuee;
    }
    const [value, setValue] = useState()
    const [sent, setSent] = useState()
    const [toggle, setToggle] = useState(false)

    function MobileMenu(){
        if(toggle){
            return(
                <div className="mobilemenu">
                    <div className="mmitems">
                        <div className="mmtop">
                            <div onClick={()=>window.location.href='/'} className="mmhome">
                                <img className="mmhomeicon" src={home}/>
                                <span className="mmhometext">Home</span>
                            </div>
                            <div onClick={()=>window.location.href='/tutorial'} className="mmtutorial">
                                <img className="mmtutorialicon" src={tutorial}/>
                                <span className="mmtutorialtext">Tutorial</span>
                            </div>
                            <div onClick={()=>window.location.href='/reload'} className="mmreload">
                                <img className="mmreloadicon" src={plusbutton}/>
                                <span className="mmreloadtext">Reload</span>
                            </div>
                        </div>
                        <div onClick={()=>setToggle(!toggle)} className="mmtoggle">
                            <img className="mmtogglearrow" src={menuToggle}/>
                        </div>
                        <div className="mmbottom">
                            <span className="email">{email}</span>
                            <div onClick={()=>window.location.href='/logout'} className="mmlogout">
                                <img className="mmlogouticon" src={logout}/>
                                <span className="mmlogouttext">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (<div style={{ display: 'none' }}></div>);
        }
    }

    return (
        <div className='box'>
            <style>
                {css}
            </style>
            <MobileMenu/>
            <div className="header">
              <div className="one">
                  <img className="desktoplogo" src={logo}/>
              </div>
              <div className="three">
                  <nav>
                  <img alt="" onClick={()=>window.location.href='/'} src={home} className="home" /><a href="/" className="home-href">Home</a>
                      <img alt=""  src={tutorial} className="tutorial" onClick={()=>window.location.href='/tutorial'} /><a href="/tutorial" className="tutorial-href">Tutorial</a>
                      <img alt="" src={logout} className="signout" onClick={()=>window.location.href='/signout'} /><a href="/signout" className="logout-href">Logout</a>
                  </nav>
              </div>  
          </div>
          <div className="mobile-header">
              <img onClick={()=>setToggle(!toggle)} className="menuopen" src={hamburger}/>
              <div onClick={()=>window.location.href='/reload'}>
                  <img className="logo" src={logo} />
              </div>
          </div>
          <div className='full-page-container'>
                <div className='inputdiv'>
                    <span className='account'>Account Verification</span>
                    <span className='entertext'>Please enter your phone number to verify your account.</span>
                    <span className='disclaimer'>Phone number will not be used for any other reason. <span className='disclaimertwo'>sms rate may apply.</span></span>
                    <span className='input-label'>Phone Number</span>
                    <form className='inputform' onSubmit={sendCode}>
                        <select disabled={sent} defaultValue={"1 "} className="form-select" id="phone" name="phone">
                            <option value="93">Afghanistan +93</option>
                            <option value="358">Aland Islands +358</option>
                            <option value="355">Albania +355</option>
                            <option value="213">Algeria +213</option>
                            <option value="1684">American Samoa +1684</option>
                            <option value="376">Andorra +376</option>
                            <option value="244">Angola +244</option>
                            <option value="1264">Anguilla +1264</option>
                            <option value="672">Antarctica +672</option>
                            <option value="1268">Antigua and Barbuda +1268</option>
                            <option value="54">Argentina +54</option>
                            <option value="374">Armenia +374</option>
                            <option value="297">Aruba +297</option>
                            <option value="61">Australia +61</option>
                            <option value="43">Austria +43</option>
                            <option value="994">Azerbaijan +994</option>
                            <option value="1242">Bahamas +1242</option>
                            <option value="973">Bahrain +973</option>
                            <option value="880">Bangladesh +880</option>
                            <option value="1246">Barbados +1246</option>
                            <option value="375">Belarus +375</option>
                            <option value="32">Belgium +32</option>
                            <option value="501">Belize +501</option>
                            <option value="229">Benin +229</option>
                            <option value="1441">Bermuda +1441</option>
                            <option value="975">Bhutan +975</option>
                            <option value="591">Bolivia +591</option>
                            <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                            <option value="387">Bosnia and Herzegovina +387</option>
                            <option value="267">Botswana +267</option>
                            <option value="55">Bouvet Island +55</option>
                            <option value="55">Brazil +55</option>
                            <option value="246">British Indian Ocean Territory +246</option>
                            <option value="673">Brunei Darussalam +673</option>
                            <option value="359">Bulgaria +359</option>
                            <option value="226">Burkina Faso +226</option>
                            <option value="257">Burundi +257</option>
                            <option value="855">Cambodia +855</option>
                            <option value="237">Cameroon +237</option>
                            <option value="1">Canada +1</option>
                            <option value="238">Cape Verde +238</option>
                            <option value="1345">Cayman Islands +1345</option>
                            <option value="236">Central African Republic +236</option>
                            <option value="235">Chad +235</option>
                            <option value="56">Chile +56</option>
                            <option value="86">China +86</option>
                            <option value="61">Christmas Island +61</option>
                            <option value="672">Cocos (Keeling) Islands +672</option>
                            <option value="57">Colombia +57</option>
                            <option value="269">Comoros +269</option>
                            <option value="242">Congo +242</option>
                            <option value="242">Congo, Democratic Republic of the Congo +242</option>
                            <option value="682">Cook Islands +682</option>
                            <option value="506">Costa Rica +506</option>
                            <option value="225">Cote D'Ivoire +225</option>
                            <option value="385">Croatia +385</option>
                            <option value="53">Cuba +53</option>
                            <option value="599">Curacao +599</option>
                            <option value="357">Cyprus +357</option>
                            <option value="420">Czech Republic +420</option>
                            <option value="45">Denmark +45</option>
                            <option value="253">Djibouti +253</option>
                            <option value="1767">Dominica +1767</option>
                            <option value="1809">Dominican Republic +1809</option>
                            <option value="593">Ecuador +593</option>
                            <option value="20">Egypt +20</option>
                            <option value="503">El Salvador +503</option>
                            <option value="240">Equatorial Guinea +240</option>
                            <option value="291">Eritrea +291</option>
                            <option value="372">Estonia +372</option>
                            <option value="251">Ethiopia +251</option>
                            <option value="500">Falkland Islands (Malvinas) +500</option>
                            <option value="298">Faroe Islands +298</option>
                            <option value="679">Fiji +679</option>
                            <option value="358">Finland +358</option>
                            <option value="33">France +33</option>
                            <option value="594">French Guiana +594</option>
                            <option value="689">French Polynesia +689</option>
                            <option value="262">French Southern Territories +262</option>
                            <option value="241">Gabon +241</option>
                            <option value="220">Gambia +220</option>
                            <option value="995">Georgia +995</option>
                            <option value="49">Germany +49</option>
                            <option value="233">Ghana +233</option>
                            <option value="350">Gibraltar +350</option>
                            <option value="30">Greece +30</option>
                            <option value="299">Greenland +299</option>
                            <option value="1473">Grenada +1473</option>
                            <option value="590">Guadeloupe +590</option>
                            <option value="1671">Guam +1671</option>
                            <option value="502">Guatemala +502</option>
                            <option value="44">Guernsey +44</option>
                            <option value="224">Guinea +224</option>
                            <option value="245">Guinea-Bissau +245</option>
                            <option value="592">Guyana +592</option>
                            <option value="509">Haiti +509</option>
                            <option value="39">Holy See (Vatican City State) +39</option>
                            <option value="504">Honduras +504</option>
                            <option value="852">Hong Kong +852</option>
                            <option value="36">Hungary +36</option>
                            <option value="354">Iceland +354</option>
                            <option value="91">India +91</option>
                            <option value="62">Indonesia +62</option>
                            <option value="98">Iran, Islamic Republic of +98</option>
                            <option value="964">Iraq +964</option>
                            <option value="353">Ireland +353</option>
                            <option value="44">Isle of Man +44</option>
                            <option value="972">Israel +972</option>
                            <option value="39">Italy +39</option>
                            <option value="1876">Jamaica +1876</option>
                            <option value="81">Japan +81</option>
                            <option value="44">Jersey +44</option>
                            <option value="962">Jordan +962</option>
                            <option value="7">Kazakhstan +7</option>
                            <option value="254">Kenya +254</option>
                            <option value="686">Kiribati +686</option>
                            <option value="850">Korea, Democratic People's Republic of +850</option>
                            <option value="82">Korea, Republic of +82</option>
                            <option value="383">Kosovo +383</option>
                            <option value="965">Kuwait +965</option>
                            <option value="996">Kyrgyzstan +996</option>
                            <option value="856">Lao People's Democratic Republic +856</option>
                            <option value="371">Latvia +371</option>
                            <option value="961">Lebanon +961</option>
                            <option value="266">Lesotho +266</option>
                            <option value="231">Liberia +231</option>
                            <option value="218">Libyan Arab Jamahiriya +218</option>
                            <option value="423">Liechtenstein +423</option>
                            <option value="370">Lithuania +370</option>
                            <option value="352">Luxembourg +352</option>
                            <option value="853">Macao +853</option>
                            <option value="389">Macedonia, the Former Yugoslav Republic of +389</option>
                            <option value="261">Madagascar +261</option>
                            <option value="265">Malawi +265</option>
                            <option value="60">Malaysia +60</option>
                            <option value="960">Maldives +960</option>
                            <option value="223">Mali +223</option>
                            <option value="356">Malta +356</option>
                            <option value="692">Marshall Islands +692</option>
                            <option value="596">Martinique +596</option>
                            <option value="222">Mauritania +222</option>
                            <option value="230">Mauritius +230</option>
                            <option value="262">Mayotte +262</option>
                            <option value="52">Mexico +52</option>
                            <option value="691">Micronesia, Federated States of +691</option>
                            <option value="373">Moldova, Republic of +373</option>
                            <option value="377">Monaco +377</option>
                            <option value="976">Mongolia +976</option>
                            <option value="382">Montenegro +382</option>
                            <option value="1664">Montserrat +1664</option>
                            <option value="212">Morocco +212</option>
                            <option value="258">Mozambique +258</option>
                            <option value="95">Myanmar +95</option>
                            <option value="264">Namibia +264</option>
                            <option value="674">Nauru +674</option>
                            <option value="977">Nepal +977</option>
                            <option value="31">Netherlands +31</option>
                            <option value="599">Netherlands Antilles +599</option>
                            <option value="687">New Caledonia +687</option>
                            <option value="64">New Zealand +64</option>
                            <option value="505">Nicaragua +505</option>
                            <option value="227">Niger +227</option>
                            <option value="234">Nigeria +234</option>
                            <option value="683">Niue +683</option>
                            <option value="672">Norfolk Island +672</option>
                            <option value="1670">Northern Mariana Islands +1670</option>
                            <option value="47">Norway +47</option>
                            <option value="968">Oman +968</option>
                            <option value="92">Pakistan +92</option>
                            <option value="680">Palau +680</option>
                            <option value="970">Palestinian Territory, Occupied +970</option>
                            <option value="507">Panama +507</option>
                            <option value="675">Papua New Guinea +675</option>
                            <option value="595">Paraguay +595</option>
                            <option value="51">Peru +51</option>
                            <option value="63">Philippines +63</option>
                            <option value="64">Pitcairn +64</option>
                            <option value="48">Poland +48</option>
                            <option value="351">Portugal +351</option>
                            <option value="1787">Puerto Rico +1787</option>
                            <option value="974">Qatar +974</option>
                            <option value="262">Reunion +262</option>
                            <option value="40">Romania +40</option>
                            <option value="7">Russian Federation +7</option>
                            <option value="250">Rwanda +250</option>
                            <option value="590">Saint Barthelemy +590</option>
                            <option value="290">Saint Helena +290</option>
                            <option value="1869">Saint Kitts and Nevis +1869</option>
                            <option value="1758">Saint Lucia +1758</option>
                            <option value="590">Saint Martin +590</option>
                            <option value="508">Saint Pierre and Miquelon +508</option>
                            <option value="1784">Saint Vincent and the Grenadines +1784</option>
                            <option value="684">Samoa +684</option>
                            <option value="378">San Marino +378</option>
                            <option value="239">Sao Tome and Principe +239</option>
                            <option value="966">Saudi Arabia +966</option>
                            <option value="221">Senegal +221</option>
                            <option value="381">Serbia +381</option>
                            <option value="381">Serbia and Montenegro +381</option>
                            <option value="248">Seychelles +248</option>
                            <option value="232">Sierra Leone +232</option>
                            <option value="65">Singapore +65</option>
                            <option value="721">Sint Maarten +721</option>
                            <option value="421">Slovakia +421</option>
                            <option value="386">Slovenia +386</option>
                            <option value="677">Solomon Islands +677</option>
                            <option value="252">Somalia +252</option>
                            <option value="27">South Africa +27</option>
                            <option value="500">South Georgia and the South Sandwich Islands +500</option>
                            <option value="211">South Sudan +211</option>
                            <option value="34">Spain +34</option>
                            <option value="94">Sri Lanka +94</option>
                            <option value="249">Sudan +249</option>
                            <option value="597">Suriname +597</option>
                            <option value="47">Svalbard and Jan Mayen +47</option>
                            <option value="268">Swaziland +268</option>
                            <option value="46">Sweden +46</option>
                            <option value="41">Switzerland +41</option>
                            <option value="963">Syrian Arab Republic +963</option>
                            <option value="886">Taiwan +886</option>
                            <option value="992">Tajikistan +992</option>
                            <option value="255">Tanzania, United Republic of +255</option>
                            <option value="66">Thailand +66</option>
                            <option value="670">Timor-Leste +670</option>
                            <option value="228">Togo +228</option>
                            <option value="690">Tokelau +690</option>
                            <option value="676">Tonga +676</option>
                            <option value="1868">Trinidad and Tobago +1868</option>
                            <option value="216">Tunisia +216</option>
                            <option value="90">Turkey +90</option>
                            <option value="7370">Turkmenistan +7370</option>
                            <option value="1649">Turks and Caicos Islands +1649</option>
                            <option value="688">Tuvalu +688</option>
                            <option value="256">Uganda +256</option>
                            <option value="380">Ukraine +380</option>
                            <option value="971">United Arab Emirates +971</option>
                            <option value="44">United Kingdom +44</option>
                            <option value="1 ">United States +1</option>
                            <option value="1">United States Minor Outlying Islands +1</option>
                            <option value="598">Uruguay +598</option>
                            <option value="998">Uzbekistan +998</option>
                            <option value="678">Vanuatu +678</option>
                            <option value="58">Venezuela +58</option>
                            <option value="84">Viet Nam +84</option>
                            <option value="1284">Virgin Islands, British +1284</option>
                            <option value="1340">Virgin Islands, U.s. +1340</option>
                            <option value="681">Wallis and Futuna +681</option>
                            <option value="212">Western Sahara +212</option>
                            <option value="967">Yemen +967</option>
                            <option value="260">Zambia +260</option>
                            <option value="263">Zimbabwe +263</option>
                        </select>
                        <input disabled={sent} onChange={handleChange} type='tel' className='phoneinput'/>
                        <button disabled={sent} type='submit' className='enter'>enter</button>
                    </form>
                </div>
                <CodeBox/>
          </div>
        </div>
    )
}
export default Verify;