CMDNAME=`basename $0`
SCRIPTPATH=`cd $(dirname $0) && pwd`

touch "$SCRIPTPATH/src/js/`date +%d`.js"
touch "$SCRIPTPATH/src/pug/`date +%d`.pug"
