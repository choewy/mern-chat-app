import express from 'express';
import settings from './setting';

declare global {
  interface MongoResult {
    _doc: any;
  }
}

export default settings(express()).forEach((setting) => setting());
