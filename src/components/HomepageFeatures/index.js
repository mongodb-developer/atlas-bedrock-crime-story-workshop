import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Multi-Cloud, Multi-Region Database Service',
    illustration: 'img/database.png',
    description: (
      <>
        Deploy your applications to multiple cloud platforms across multiple regions, including AWS Cloud. 
      </>
    ),
  },
  {
    title: 'Fully-Integrated Developer Data Platform',
    illustration: 'img/app-services.png',
    description: (
      <>
        Build and run production-ready apps on top of Atlas in a fraction of the time with fully managed cloud services such as Functions, Triggers, and APIs for and with AWS. 
      </>
    ),
  },
  {
    title: 'Support for AWS Bedrock',
    illustration: 'img/analytics.png',
    description: (
      <>
        Leverage the rich AI modules from AWS bedrock suite in any language, including Node.js, Java, Python, and Go.
      </>
    ),
  },
];

function Feature({illustration, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={illustration} className={styles.featureImg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
