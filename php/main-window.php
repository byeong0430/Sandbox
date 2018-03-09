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
            <div class="col-12 inner-shell" id="consent-form-wrapper">
                <h3>Consent Form</h3>
                <hr>
                <p id="consent-detail">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, 
                    similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 
                    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
                    cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
                    Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. 
                    Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                </p>
                <hr>
                <div class="col-12">
                    <input type="checkbox" class="form-check-input" id="consent-checkbox">
                    <label class="form-check-label" for="consent-checkbox" id="agreement-question">
                        I agree to the terms & conditions and Privacy Policy.
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 inner-shell" id="placefinder-wrapper" style="display: none;">
                <?php require("placeID-map.php") ?>
            </div>
        </div>

    </div>
</div>