const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signingUp, setSigningUp] = useState('');
    const { addToast } = useToasts();
    const auth = useAuth();
    const history = useHistory();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSigningUp(true);

        let error = false;
        if (!name || !email || !password || !confirmPassword) {
            addToast('Please fill all the fields', {
                appearance: 'error',
                autoDismiss: true,
            });
            error = true;
        }

        if (password !== confirmPassword) {
            addToast('Make sure password and confirm password matches', {
                appearance: 'error',
                autoDismiss: true,
            });

            error = true;
        }

        if (error) {
            return setSigningUp(false);
        }

        const response = await auth.signup(name, email, password, confirmPassword);

        if (response.success) {
            history.push('/login');
            setSigningUp(false);

            return addToast('User registered successfully, please login now', {
                appearance: 'success',
                autoDismiss: true,
            });
        } else {
            addToast(response.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }

        setSigningUp(false);
    };
}