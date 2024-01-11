import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import axios from 'axios';
import { useEffect, useState } from 'react';

import {useHistory} from '@docusaurus/router';

import styles from './index.module.css';



function HomepageHeader() {
  

  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          {/* <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started 🧁
          </Link> */}
         <ContactDetailsPopup />
        </div>
      </div>
    </header>
  );
}



function ContactDetailsPopup() {
  const history = useHistory();
  const [isRegistered, setIsRegistered] = useState(false);
  const [skipRegistration, setSkipRegistration] = useState(true);

  useEffect(() => {
    // Check if the user is registered in local storage
    const registrationStatus = localStorage.getItem('registrationStatus');
    setIsRegistered(registrationStatus === 'registered');
  }, []);

  const saveDetails = async (e) => {
    e.preventDefault();
    console.log('saving details');
    console.log(e.target);
    console.log(e.target.firstname.value);
    console.log(e.target.email.value);
    console.log(e.target.company.value);

    // Perform input validation
    const firstName = e.target.firstname.value;
    const email = e.target.email.value;
    const company = e.target.company.value;

    if (firstName.trim() === '') {
      alert('Please enter your first name');
      return;
    }

    if (email.trim() === '') {
      alert('Please enter your email');
      return;
    }

    // Email validation using regex
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (company.trim() === '') {
      alert('Please enter your company');
      return;
    }

    // Send the data to the API
    try {
      await axios.post('https://eu-west-1.aws.data.mongodb-api.com/app/aws-summit2023-vagfq/endpoint/registerWorkshopUser', {
        firstName,
        email,
        company,
      });
      console.log('Registration successful');

      // Store registration status in local storage
      localStorage.setItem('registrationStatus', 'registered');
      setIsRegistered(true);

      // Proceed with saving details and navigating
      history.push('/atlas-bedrock-crime-story-workshop/docs/intro');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle the error or show an appropriate message
    }
  };

  return (
    <div className={styles.contactDetailsPopup}>
     {isRegistered  && (
        <Link to="/docs/intro" className="button button--secondary button--lg">Go to Intro</Link>)
       || skipRegistration && (  <div className={styles.startPoint} ><button className="button button--secondary button--lg" onClick={() => setSkipRegistration(false)}>Get Started 🏁</button>
       </div>) || <form onSubmit={saveDetails}className={styles.form}>
        <div className={styles.formRow}>
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="firstname" placeholder="Your name.." />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Your email.." />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" placeholder="Your company.." />
        </div>
        <div className={styles.formRow}>
         <button className="button button--secondary button--lg" type="submit">Start 🚀</button>
         
        </div>
        <Link to="/docs/intro" className={styles.skipReg}>Skip Registration</Link>
      </form>}
    
    </div>
  );
}


export default function Home() {
  return (
    <Layout
      title="AWS Summit TLV: MongoDB Atlas Workshop"
      description="MongoDB Atlas and Mern: Hands-on Workshop">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
