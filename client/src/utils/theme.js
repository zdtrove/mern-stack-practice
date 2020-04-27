import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export default {
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secodary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    globalStyles: {
        common: {
            root: {
                '& .MuiTextField-root': {
                    width: '50ch'
                },
                '& .MuiFormHelperText-contained': {
                    marginLeft: 0
                },
                '& .MuiFormControl-root': {
                    padding: '8px'
                }
            },
            paper: {
                marginTop: theme.spacing(15),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            form: {
                marginTop: theme.spacing(3)
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            wrappSubmit: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '8px'
            },
            progress: {
                color: '#1976d2',
                position: 'absolute'
            }
        },
        register: {},
        login: {
            wrapError: {
                textAlign: 'center'
            },
            errors: {
                color: 'red'
            }
        }
    }
}