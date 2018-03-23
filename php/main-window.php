<div class="col-12 tab-content">
    <div id="home" class="tab-pane fade" role="tabpanel" aria-labelledby="home-tab">
        <h3>HOME</h3>
        <p>Some content.</p>
    </div>
    <div id="power" class="tab-pane fade" role="tabpanel" aria-labelledby="power-tab">
        <h3>Menu 1</h3>
        <p>Some content in menu 1.</p>
    </div>
    <div id="placefinder" class="tab-pane fade show active" role="tabpanel" aria-labelledby="placefinder-tab">
        <div class="row">
            <div class="col-12 inner-shell" id="signup-wrapper" style="display: none;">
                <?php require("signup-form.php") ?>
            </div>
        </div>
        <div class="row">
            <div class="col-12 inner-shell" id="login-wrapper">
                <?php require("login-form.php") ?>
            </div>
        </div>
        <div class="row">
            <div class="col-12 inner-shell" id="consent-detail-wrapper" style="display: none;">
                <?php require("consent-form.php") ?>
            </div>
        </div>
        <div class="row">
            <div class="col-12 inner-shell" id="placefinder-wrapper" style="display: none;">
                <?php require("placeID-map.php") ?>
            </div>
        </div>
    </div>
</div>
