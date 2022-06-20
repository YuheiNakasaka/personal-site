import Head from "next/head";
import { Avatar, Image } from "@chakra-ui/react";
import { NextPage } from "next";

const FleetArtEditorAboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fleet Art Editor</title>
        <meta name="description" content="FleetArt with emoji and text" />
      </Head>
      <section className="container">
        <div className="section">
          <div className="icon">
            <Avatar size="4xl" src={"../../fleet_art_editor_icon.png"}></Avatar>
          </div>

          <h1>Fleet Art Editor</h1>

          <p>
            Fleet Art Editor is an application for creating FleetArt using
            emojis and texts.
          </p>

          <p>
            In addition to the features of the original version of the editing
            editor, Fleet Art Editor has a history feature.
          </p>

          <p>
            This allows you to save your editing history for the past few
            projects.
          </p>

          <p>It is also possible to recreate from the saved history.</p>

          <p>
            The created fleet art can be saved directly to the camera roll. Of
            course, you can also share it to other SNS.
          </p>

          <p>
            If you tweet with the tag
            <a href="https://twitter.com/search?q=%23fleetart&amp;src=typed_query&amp;f=live">
              #fleetart
            </a>
            , you can share your fleet art with the rest of the world.
          </p>

          <div className="dl-icons">
            <div className="dl-icon">
              <a
                href="https://apps.apple.com/bg/app/id1584350360"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="apple"
                  alt="apple btn"
                  sizes="4xl"
                  src={"../../apple_dl_icon.svg"}
                ></Image>
              </a>
            </div>
            <div className="dl-icon">
              <a
                href="https://play.google.com/store/apps/details?id=com.razokulover.fleet_art_editor&amp;hl=ja"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="android"
                  alt="android btn"
                  sizes="4xl"
                  src={"../../google-play-badge.png"}
                ></Image>
              </a>
            </div>
          </div>
        </div>
      </section>
      <style global jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .section {
          padding: 10px;
        }
        .section .icon {
          text-align: center;
        }
        .section .icon img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
        }
        .section .dl-icons {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }
        .section .dl-icons .dl-icon {
          display: inline-block;
        }
        .section .dl-icons .dl-icon img {
          width: 100px;
        }
        .section .dl-icons .dl-icon img.apple {
          margin: 8px;
        }
        .section .dl-icons .dl-icon img.android {
          width: 140px;
        }
        h1,
        p {
          padding: 20px 0 0 0;
        }
      `}</style>
    </>
  );
};

export default FleetArtEditorAboutPage;
