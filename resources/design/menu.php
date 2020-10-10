<?php session_start() ?>

<a class="py-2 d-none d-md-inline-block" <?php
                                            if (!empty($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] == "S2liaXJpZ2UgMTgwMDcyNTU2Nw==") { ?> style="display: block" <?php } else { ?> style="display:none !important" <?php } ?> href="/food">Food</a>
<?php
if (!empty($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] == "S2liaXJpZ2UgMTgwMDcyNTU2Nw==") { ?>
    <a class="py-2 d-none d-md-inline-block" href="/logout?data=cmVwb3J0bG9zdGlk&_rdr">Logout</a>
<?php
} else { ?>
    <a class="py-2 d-none d-md-inline-block" href="/login?data=cmVwb3J0bG9zdGlk&tab=login&_rdr">Login</a>
    <a class="py-2 d-none d-md-inline-block" href="/login?data=cmVwb3J0bG9zdGlk&tab=signup&_rdr">SignUp</a>

<?php }
?>
<?php
if (!empty($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] == "S2liaXJpZ2UgMTgwMDcyNTU2Nw==") { ?>
    <a class="py-2 d-none d-md-inline-block" href="/food?data=cmVwb3J0bG9zdGlk&_rdr">Food</a>
<?php
}
?>
<?php
if (!empty($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] == "S2liaXJpZ2UgMTgwMDcyNTU2Nw==") { ?>
    <a class="py-2 d-none d-md-inline-block sm" href="/logout?data=cmVwb3J0bG9zdGlk&_rdr">Logout</a>
<?php
} else { ?>
    <a class="py-2 d-none d-sm-inline-block sm" href="/login?data=cmVwb3J0bG9zdGlk&tab=login&_rdr">Login</a>
    <a class="py-2 d-none d-sm-inline-block sm" href="/login?data=cmVwb3J0bG9zdGlk&tab=signup&_rdr">SignUp</a>

<?php }
?>