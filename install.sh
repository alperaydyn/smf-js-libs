#!/bin/bash
(
cd ~/workspace
mkdir .tmp
wget https://github.com/smartface/smf-js-libs/archive/master.zip -O .tmp/smf-js-libs.zip
unzip .tmp/smf-js-libs.zip 'smf-js-libs-master/libs/*' -d .tmp
rm smf-js-libs.zip
mv .tmp/smf-js-libs-master/libs scripts/
rm .tmp -fr
)
