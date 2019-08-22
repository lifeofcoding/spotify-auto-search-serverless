import React from 'react';
import css from './UI.module.css';

export default function container(props) {
  return (
    <div className={css.Container + ' ' + (props.className || '')} >
      {props.children}
    </div>
  )
}