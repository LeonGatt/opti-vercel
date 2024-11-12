'use client'


import React from 'react'
import { useAuth } from '../../_providers/Auth'
import classes from './index.module.css'

export const LayoutGrid: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const [show, setShow] = React.useState(false)
  const { user } = useAuth()

  const isAdmin = user?.roles?.includes('admin')
  if (!isAdmin) return null

  return (
    <>
      <button
        type="button"
        className={classes.layoutGridTrigger}
        onClick={() => setShow(!show)}
      >
        Toggle Grid
      </button>
      
      { show && 
        <div className={ classes.layoutGridWrapper } >
          <div id="layoutGrid" className= { classes.layoutGrid }>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
        </div>
      }
    </>
  );
}