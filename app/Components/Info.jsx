import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
function Info({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        "& .MuiDialogContent-root": {
            padding: theme.spacing(2),
        },
        "& .MuiDialogActions-root": {
            padding: theme.spacing(1),
        },
    }));
    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    How To Play
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom style={{ direction: "rtl" }}>
                        • كل لاعب يختار رقم مكوّن من 4 أرقام. <br />
                        • على اللاعب الآخر معرفة الرقم الذي اختاره خصمه. <br />
                        • يقوم كل لاعب بكتابة رقم، ثم يتم التحقق مما إذا كانت
                        هناك أرقام متشابهة بين الرقمين أم لا. <br />
                        • بجانب كل محاولة سيظهر عدد الأرقام الصحيحة التي تطابقت
                        مع رقم الخصم. <br />
                        • من خلال هذه المعلومات، على اللاعب تكوين الرقم الصحيح
                        باستخدام الأرقام الصحيحة الظاهرة. <br />• بجانب كل رقم
                        يوجد مكان إدخال لكتابة الرقم الذي يشكّ اللاعب في صحته.
                    </Typography>
                    <hr />
                    <Typography gutterBottom>
                        • Each player chooses a 4-digit number. <br />• The
                        opponent must guess the other player’s number. <br />
                        • Both players enter a number to check if any digits
                        match. <br />
                        • Next to each attempt, the number of correct digits
                        will appear. <br />
                        • Using this information, players must deduce the
                        correct number. <br />• Beside each digit, there’s an
                        input field where the player can write the digit they
                        suspect is correct.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        OK
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

export default Info;
