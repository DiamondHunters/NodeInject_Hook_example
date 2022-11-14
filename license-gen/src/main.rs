use random_string::generate;

const LICENSE_CHARS: &str = "L23456789ABCDEFGHJKMNPQRSTUVWXYZ";
fn main() {
    generate_license();
}

fn generate_license(){
    let mut license = generate(22, LICENSE_CHARS);
    for n in  0..2 {
        let mut o = 0;
        for i in (0..16).step_by(2) {
            o += LICENSE_CHARS.find(&license[n+i..=n+i]).unwrap()
        }
        o %= LICENSE_CHARS.len();
        license += &LICENSE_CHARS[o..=o];
    }
    license.insert(6, '-');
    license.insert(13, '-');
    license.insert(20, '-');
    println!("License for you: {}", license);
}

