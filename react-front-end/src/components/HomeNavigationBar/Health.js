import react from "react";
import './Health.scss';
import { LinkPreview } from '@dhaiwat10/react-link-preview';


export default function Health(props) {

  return (
    <div className="health-component">
      <div className="vet-div">
        <h2>Dr. Nick Cage's Uncaged Veterinary Clinic</h2>
        <br/>
        <div>
        <h3>The Dr. Nicholas Cage - DVM</h3>
        <h3>299 Alva Street, Victoria BC</h3>
        <h3>(250)-666-9000</h3>
        <br/>
        <h3>Last Visit : March 9th, 2022</h3>
        </div>
        <img src='https://www.theglobeandmail.com/resizer/hFcYqOk-HRF8un0VP13NuvTy6xM=/1200x1040/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/DHT56337DVHSPPNLOYVOOU6LXI' alt='' />
      </div>
      <h2 className='dog-art'>Dog Health Articles for You:</h2>
      <div className="blog-posts">
        <div className=""></div>
        <LinkPreview url='https://www.akc.org/expert-advice/health/kennel-cough-symptoms-treatment-and-prevention/' width='80%' />
        <LinkPreview url='https://www.medicalnewstoday.com/articles/322868' width='80%' />
        <LinkPreview url='https://pursuit.unimelb.edu.au/articles/science-can-help-dogs-enjoy-their-best-life' width='80%' />
      </div>
    </div>
  )
}