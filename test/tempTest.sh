#!/usr/bin/env bash
number=$1
addedSuffix=$2

#template=/home/yisrael/projects/ns-cli/test/testData/testingTemplate.txt
template=/home/yisrael/projects/ns-cli/test/testData/sampleTemplate.sh
email=rlj613@gmail.com

ns='node ~/projects/nostack-cli/bin/run'

$ns newapp -a app${number}
#
#$ns2 quickstarter -e rlj613@gmail.com -w letMeIn1! -l secret1ABC  -u irnold${number} -s TestStack${number}
#
#if [ -z "${addedSuffix}" ]; then
#    $ns2 spinstack -a app${number} -t ${template} -u irnold${number} -s TestStack${number} -e ${email}
#else
#    $ns2 spinstack -a app${number} -t ${template} -u irnold${number} -s TestStack${number} -e ${email} -x ${addedSuffix}
#fi

#$ns2 makecode -a app${number}
