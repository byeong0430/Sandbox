<div class="col-12">
    <form class="needs-validation" id="login-form" novalidate>
        <div class="row justify-content-center">
            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 login-col">
                <label for="login-email"><h5>Please login</h5></label>
                <div class="input-group">
                    <input type="email" name="login_email" class="form-control" id="login-email" placeholder="Email" aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                        Please choose a valid email address.
                    </div>
                </div>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 login-col">
                <input type="password" name="login_password" class="form-control" id="login-password" placeholder="Password" required>
                <div class="invalid-feedback">
                    Please provide a valid password.
                </div>
            </div>
        </div>

        <button class="btn btn-primary" id="login-submit-btn" type="submit">Log in</button>
    </form>
</div>