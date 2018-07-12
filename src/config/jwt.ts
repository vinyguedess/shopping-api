

export default {
    secret: "th1z_i5_my_s3cret",
    session: { session: false },
    expiresAt: (date =>
    {
        date.setHours(date.getHours() + 1);
        return date.getTime();
    })(new Date())
}