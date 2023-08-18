import Typography  from 'funuicss/component/Typography'
import Icon  from 'funuicss/component/Icon'
import Input  from 'funuicss/component/Input'
import IconicInput  from 'funuicss/component/IconicInput'
import BreadCrumb from 'funuicss/component/BreadCrumb'
import Button from 'funuicss/component/Button'
import React from 'react'
import Link from 'next/link'

export default function region() {
  return (
    <div className='padding-top-20'>
      <div className='width-400-max center'>
      <Link href="/" legacyBehavior>
           <Button rounded bg="light" small>
           <Icon icon="fas fa-home" /> Home
           </Button>
            </Link>
            <BreadCrumb type={"greater"} />
            <Link href="/" legacyBehavior>
           <Button rounded bg="light" small>
           <Icon icon="fas fa-check" /> Region
           </Button>
            </Link>
            <p />
        <Typography
        text="New Region"
        heading='h4'
        />
        <br />
        <Typography
        text="Add a new rgion"
        />
        <div className="padding-top-30">
        <Input type="text" label="Region" funcss="region" rounded fullWidth bordered />
        </div>
      </div>
    </div>
  )
}
