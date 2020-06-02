import React from 'react'
import PropTypes from 'prop-types'
import { Collapse, Box, Icon, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Error from '@material-ui/icons/Error'
import theme from 'components/Theme'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4, 0, 3)
  },
  errorBox: {
    padding: 15,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: `${theme.palette.error.main}`,
    borderRadius: '10px',
    backgroundColor: `${theme.palette.error.light}`
  },
  text: {
    margin: theme.spacing(0, 2, 0),
    color: `${theme.palette.error.contrastText}`
  },
  icon: {
    color: `${theme.palette.error.contrastText}`
  }
}))

ErrorBox.propTypes = {
  message: PropTypes.string
}

export default function ErrorBox (props) {
  const { message } = props
  const classes = useStyles(theme)
  const collapse = message
  return (
    <Collapse in={collapse}>
      <div className={classes.root}>
        <Box className={classes.errorBox}>
          <Grid container spacing={3} >
            <Icon className={classes.icon}>
              <Error/>
            </Icon>
            <Typography className={classes.text}>
              {props.message}
            </Typography>
          </Grid>
        </Box>
      </div>
    </Collapse>
  )
}
