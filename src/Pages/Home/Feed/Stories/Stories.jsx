import { MdAdd } from "react-icons/md";
import classnames from "classnames/bind";
import styles from "./Stories.module.scss";
import StoryItem from "./StoryItem";

const cx = classnames.bind(styles);
const Stories = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("create-story")}>
        <img
          src="https://images.unsplash.com/photo-1594937113195-27f8b9046013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmUlMjB3aW5kb3clMjB2aWV3fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          className={cx("background")}
          alt="background"
        />
        <div className={cx("body-story")}>
          <div className={cx("btn-create")}>
            <div className={cx("icon")}>
              <MdAdd />
            </div>
          </div>
          <p className={cx("title")}>Add Story</p>
        </div>
      </div>
      <StoryItem
        background="https://images.pexels.com/photos/358238/pexels-photo-358238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        avatar="https://scontent.xx.fbcdn.net/v/t1.6435-1/75323364_111497183606160_112259471475998720_n.jpg?stp=cp0_dst-jpg_p50x50&_nc_cat=111&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=bGwn2bH2sasAX9OmGcv&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AT-X9E2mqnPdGVsocDBs2idUlDkiLckSY0oGbHmPscDNww&oe=63370945"
        username="Hao Quangg"
      />
      <StoryItem
        background="https://w0.peakpx.com/wallpaper/123/54/HD-wallpaper-scenery-lake-nature-sky-tree-water.jpg"
        avatar="https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-1/295086539_1768794513466701_1229384273892606441_n.jpg?stp=cp0_dst-jpg_p86x86&_nc_cat=110&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=rOehe7dLHcUAX91ApQd&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-sUu7Vx8JmSzGHyKM3i5Sd_DHV0YwKcYFnnb8Zzpl3VQ&oe=6315D50F"
        username="Hao Quangg"
      />
      <StoryItem
        background="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQo63KHZic8t-lXFc9R2b-SeOsMMyLopHoQ&usqp=CAU"
        avatar="https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-1/278470978_566456674839514_7114297284072046140_n.jpg?stp=cp0_dst-jpg_p60x60&_nc_cat=1&ccb=1-7&_nc_sid=c6021c&_nc_ohc=PdkI41qMBTQAX_ueh5e&_nc_ht=scontent.fhan2-2.fna&oh=00_AT9VYfkmUC8i617pEmeWttUtWW5bw7Z0Wy2kk1_cI7r6wA&oe=6315786C"
        username="Hariwon"
      />
      <StoryItem
        background="https://www.xtrafondos.com/wallpapers/vertical/paisaje-de-lago-en-las-montanas-al-amanecer-7254.jpg"
        avatar="https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/272952716_434858354896114_8775706100094979278_n.jpg?stp=c0.15.100.100a_dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=jg85ZhTWBzgAX_GKnmO&_nc_ht=scontent.fhan14-2.fna&oh=00_AT_R0_7cBVv5wyKdinv7I23nvyR_SYVO4ZebHC2kKoJb1A&oe=631F7C15"
        username="Hanh Le"
      />
    </div>
  );
};

export default Stories;
