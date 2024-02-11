#!/usr/bin/env node

const options = {
  openapi:          "3.1.0",     // Enable/Disable OpenAPI.                        By default is null
  language:         "en-US",     // Change response language.                      By default is 'en-US'
  disableLogs:      false,    // Enable/Disable logs.                           By default is false
  autoHeaders:      true,    // Enable/Disable automatic headers recognition.  By default is true
  autoQuery:        true,    // Enable/Disable automatic query recognition.    By default is true
  autoBody:         true,    // Enable/Disable automatic body recognition.     By default is true
  writeOutputFile:  true,     // Enable/Disable writing the output file.        By default is true
  autoResponse:     true
};

const swaggerAutogen = require('swagger-autogen')(options)
const fs = require('fs');
const path = require('path');

const outputFile = '../swagger.json'
const baseDir = path.join(__dirname, '../api');

const endpointsFiles = findRoutesFiles(baseDir, '.router.js')

const doc = {
  info: {
    title: 'SIMBIOTIK API',
    description: ''
  },
  host: 'localhost:3001'
};

swaggerAutogen(outputFile, endpointsFiles, doc)

function findRoutesFiles(directory, endsWith = '') {
  const filePathList = [];
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      findRoutesFiles(filePath).map(e => e.endsWith(endsWith) && filePathList.push(e))
    } else if (file.endsWith(endsWith)) {
      filePathList.push(filePath);
    }
  }
  return filePathList
}