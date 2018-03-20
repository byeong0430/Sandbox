<div class="col-12">
    <form class="needs-validation" id="signup-form" novalidate>
        <div class="row justify-content-lg-center">
            <div class="col-7 signup-col">
                <label for="validationCustomUsername"><h5>Sign up with your email address</h5></label>
                <div class="input-group">
                    <input name="input_email" type="email" class="form-control" id="validationCustomUsername" placeholder="Email" aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                        Please choose a valid email address.
                    </div>
                </div>
            </div>
            <div class="col-7 signup-col">
                <input name="input_password" type="password" class="form-control" id="password" placeholder="Password" required>
                <div class="invalid-feedback">
                    Please provide a valid password.
                </div>
            </div>
            <div class="col-7 signup-col">
                <span>Are you self-employed? </span>
                <label><input class="signup-radio" checked id="radio-Y" type="radio" name="employmentType" value=1 required>Yes</label>
                <label><input class="signup-radio" id="radio-N" type="radio" name="employmentType" value=2>No</label>
            </div>
            <div class="col-7 signup-col" style="display: none;" id="businessName-holder">
                <input type="text" class="form-control" id="businessName" placeholder="Business Name" required>
                <div class="invalid-feedback">
                    Please provide a valid name.
                </div>
            </div>
        </div>

        <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                <label class="form-check-label" for="invalidCheck">
                    Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                    You must agree before submitting.
                </div>
            </div>
        </div>

        <button class="btn btn-primary" id="signup-submit-btn" type="submit">Sign up</button>
    </form>
</div>