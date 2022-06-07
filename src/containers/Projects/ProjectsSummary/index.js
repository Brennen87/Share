import * as React from 'react';
import { connect } from 'react-redux';
import { centToUSD } from '../../../helpers';
import { InfoBlock } from '../../../components/UI/InfoBlock';
import { InfoTooltip } from '../../../components/UI/InfoTooltip';

function ProjectsSummary({ projectsList: { data } }) {
  return (
    <div className="projects_summary">
      <div className="projects_summary__inner">
        <div className="projects_summary__boxes">
          <div className="projects_summary__boxes_inner">
            <div className="projects_summary__box">
              <div className="projects_summary__box_icon">
                <GrossTotalIcon />
              </div>
              <div className="projects_summary__box_content">
                <div className="projects_summary__box_title">Gross total</div>
                <div className="projects_summary__box_value">{`$${centToUSD(
                  (data && data.gross_total) || 0
                )}`}</div>
              </div>
              <div className="projects_summary__box__info">
                All Completed and In Progress projects. Does not include Cancelled projects.
              </div>
            </div>
            <div className="projects_summary__box">
              <div className="projects_summary__box_icon">
                <TotalPaidIcon />
              </div>
              <div className="projects_summary__box_content">
                <div className="projects_summary__box_title">Total Paid</div>
                <div className="projects_summary__box_value">{`$${centToUSD(
                  (data && data.total_paid) || 0
                )}`}</div>
              </div>
              <div className="projects_summary__box__info">All Completed projects and Initial Payments made.</div>
            </div>
            <div className="projects_summary__box">
              <div className="projects_summary__box_icon">
                <TotalToBePaid />
              </div>
              <div className="projects_summary__box_content">
                <div className="projects_summary__box_title">Total To Be Paid</div>
                <div className="projects_summary__box_value">{`$${centToUSD(
                  (data && data.total_to_be_paid) || 0
                )}`}</div>
              </div>
              <div className="projects_summary__box__info">All In Progress projects - Final Payments due.</div>
            </div>
            <div className="projects_summary__box">
              <div className="projects_summary__box_icon">
                <ProjectsIcon />
              </div>
              <div className="projects_summary__box_content">
                <div className="projects_summary__box_title">Projects</div>
                <div className="projects_summary__box_value">
                  {(data && data.project_count) || 0}
                </div>
              </div>
              <div className="projects_summary__box__info">
                Total number of Completed and In Progress projects. Does not include Cancelled
                projects.
              </div>
            </div>
          </div>
        </div>
        <InfoBlock
          text="The list displays the project with the soonest deadline at the top."
          className="projects_summary__info"
        />
      </div>
      <InfoTooltip
        text="The list displays the project with the soonest deadline at the top."
        className="projects_summary__tooltip"
      />
    </div>
  );
}

const mapStateToProps = state => ({
  projectsList: state.projectStore.projectsList
});

export default connect(mapStateToProps)(ProjectsSummary);

const GrossTotalIcon = () => (
  <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M26.5535 23.5029C26.279 23.4733 26.0324 23.6719 26.0029 23.9465C25.9733 24.221 26.1719 24.4676 26.4465 24.4971L26.5535 23.5029ZM28.6459 23.1H28.1459V23.1152L28.1468 23.1305L28.6459 23.1ZM28.6459 7.39999L28.1481 7.35273L28.1459 7.3763V7.39999H28.6459ZM27.7459 6.22306V6.72306H27.7553L27.7648 6.7227L27.7459 6.22306ZM5.03047 6.22306L4.98483 6.72097L5.0076 6.72306H5.03047V6.22306ZM4.30739 7.0846H4.80739V7.01778L4.78984 6.9533L4.30739 7.0846ZM1.23047 3.00768L0.732456 2.96314L0.730469 2.98536V3.00768H1.23047ZM10.2305 2.06152L10.6111 1.73729L10.4614 1.56152H10.2305V2.06152ZM11.9997 4.13845L11.6191 4.46268L11.7688 4.63845H11.9997V4.13845ZM26.6997 4.13845L26.7898 3.64663L26.7451 3.63845H26.6997V4.13845ZM27.0095 5.05437C27.0433 5.32844 27.2928 5.52328 27.5669 5.48954C27.841 5.4558 28.0358 5.20627 28.002 4.9322L27.0095 5.05437ZM1.35158 22.7624L1.77574 22.4977L1.35158 22.7624ZM4.20184 22.7611L4.64258 22.9972L4.20184 22.7611ZM26.4465 24.4971C27.623 24.6238 28.3411 24.4016 28.754 23.9962C28.9572 23.7967 29.0572 23.5792 29.1045 23.4057C29.1279 23.3199 29.1384 23.2451 29.143 23.1879C29.1452 23.1591 29.146 23.1345 29.1461 23.1146C29.1461 23.1047 29.146 23.0959 29.1458 23.0884C29.1457 23.0846 29.1455 23.0811 29.1454 23.078C29.1453 23.0764 29.1452 23.0749 29.1452 23.0735C29.1451 23.0728 29.1451 23.0721 29.145 23.0714C29.145 23.0711 29.145 23.0706 29.145 23.0705C29.145 23.07 29.1449 23.0695 28.6459 23.1C28.1468 23.1305 28.1468 23.13 28.1467 23.1295C28.1467 23.1294 28.1467 23.1289 28.1467 23.1286C28.1466 23.128 28.1466 23.1275 28.1466 23.1269C28.1465 23.1257 28.1465 23.1247 28.1464 23.1236C28.1463 23.1216 28.1463 23.1198 28.1462 23.1181C28.1461 23.1149 28.1461 23.1125 28.1461 23.1108C28.1461 23.1075 28.1462 23.1071 28.1461 23.109C28.1457 23.1131 28.1444 23.1254 28.1397 23.1426C28.1308 23.1751 28.1097 23.2273 28.0534 23.2826C27.9472 23.3869 27.5924 23.6147 26.5535 23.5029L26.4465 24.4971ZM29.1459 23.1V7.39999H28.1459V23.1H29.1459ZM29.1436 7.44724C29.1789 7.07507 29.1315 6.75569 29.0061 6.48994C28.8792 6.22117 28.6885 6.04121 28.4946 5.92595C28.3058 5.81374 28.1182 5.7648 27.984 5.74269C27.9155 5.73142 27.8569 5.72646 27.8132 5.72436C27.7913 5.7233 27.7727 5.72296 27.7582 5.72293C27.751 5.72291 27.7447 5.72298 27.7395 5.72308C27.7368 5.72312 27.7345 5.72318 27.7324 5.72324C27.7313 5.72327 27.7304 5.7233 27.7295 5.72333C27.729 5.72335 27.7286 5.72336 27.7281 5.72338C27.7279 5.72338 27.7276 5.72339 27.7275 5.7234C27.7272 5.72341 27.7269 5.72342 27.7459 6.22306C27.7648 6.7227 27.7645 6.72271 27.7642 6.72272C27.7641 6.72273 27.7638 6.72274 27.7637 6.72274C27.7633 6.72276 27.763 6.72277 27.7626 6.72278C27.762 6.7228 27.7613 6.72282 27.7608 6.72284C27.7597 6.72287 27.7588 6.72289 27.7581 6.7229C27.7567 6.72293 27.7561 6.72293 27.7562 6.72293C27.7565 6.72293 27.7597 6.72294 27.7653 6.72321C27.7767 6.72375 27.7965 6.72529 27.8214 6.72939C27.874 6.73805 27.933 6.75546 27.9837 6.78556C28.0291 6.8126 28.0707 6.85091 28.1017 6.91676C28.1342 6.98563 28.1705 7.11721 28.1481 7.35273L29.1436 7.44724ZM27.7459 5.72306H5.03047V6.72306H27.7459V5.72306ZM5.07611 5.72515C4.88566 5.70769 4.69382 5.73661 4.51697 5.80942L4.89769 6.73411C4.92525 6.72276 4.95515 6.71825 4.98483 6.72097L5.07611 5.72515ZM4.51697 5.80942C4.34013 5.88223 4.18354 5.99677 4.0606 6.14326L4.82657 6.78613C4.84573 6.76331 4.87013 6.74545 4.89769 6.73411L4.51697 5.80942ZM4.0606 6.14326C3.93765 6.28975 3.852 6.46383 3.81096 6.65062L4.78767 6.8652C4.79406 6.83609 4.80741 6.80896 4.82657 6.78613L4.0606 6.14326ZM3.81096 6.65062C3.76992 6.83742 3.77472 7.03137 3.82494 7.2159L4.78984 6.9533C4.78202 6.92454 4.78127 6.89432 4.78767 6.8652L3.81096 6.65062ZM3.80739 7.0846V22.3241H4.80739V7.0846H3.80739ZM3.76109 22.525C3.48118 23.0475 3.23564 23.2729 3.06551 23.3624C2.91873 23.4397 2.79185 23.4361 2.65241 23.3801C2.49336 23.3163 2.32242 23.1825 2.15631 23.0028C1.99436 22.8276 1.86247 22.6366 1.77574 22.4977L0.927421 23.0272C1.03388 23.1977 1.20306 23.4448 1.42198 23.6816C1.63675 23.9139 1.9265 24.1663 2.27991 24.3081C2.65291 24.4579 3.09024 24.4795 3.53138 24.2473C3.94916 24.0273 4.31523 23.6083 4.64258 22.9972L3.76109 22.525ZM1.73047 22.3115V3.00768H0.730469V22.3115H1.73047ZM1.23047 3.00768C1.72848 3.05221 1.72846 3.05243 1.72844 3.05264C1.72844 3.05271 1.72842 3.05292 1.72841 3.05305C1.72838 3.05332 1.72836 3.05357 1.72834 3.05381C1.72829 3.05429 1.72825 3.05472 1.72821 3.0551C1.72814 3.05585 1.72809 3.05639 1.72805 3.05674C1.72798 3.05744 1.72798 3.05734 1.72808 3.05652C1.72828 3.05485 1.72885 3.05033 1.72993 3.04335C1.7321 3.02927 1.73621 3.00611 1.74321 2.97707C1.75772 2.91693 1.78196 2.84278 1.81955 2.77378C1.88666 2.65057 1.97725 2.56152 2.17662 2.56152V1.56152C1.51445 1.56152 1.13197 1.94555 0.941384 2.29542C0.850126 2.46296 0.799373 2.62534 0.77109 2.74261C0.756699 2.80227 0.747465 2.85304 0.741648 2.89069C0.738729 2.90959 0.736639 2.92539 0.735178 2.93758C0.734447 2.94369 0.733871 2.94891 0.733426 2.95318C0.733203 2.95532 0.733013 2.95723 0.732853 2.95889C0.732772 2.95972 0.7327 2.96049 0.732634 2.9612C0.732601 2.96155 0.732569 2.96189 0.73254 2.96221C0.732525 2.96238 0.732504 2.96261 0.732497 2.96269C0.732476 2.96292 0.732456 2.96314 1.23047 3.00768ZM2.17662 2.56152H10.2305V1.56152H2.17662V2.56152ZM9.84985 2.38576L11.6191 4.46268L12.3803 3.81421L10.6111 1.73729L9.84985 2.38576ZM11.9997 4.63845H26.6997V3.63845H11.9997V4.63845ZM26.6096 4.63026C26.678 4.6428 26.743 4.6697 26.8003 4.70918L27.3679 3.88586C27.1943 3.76616 26.9972 3.68462 26.7898 3.64663L26.6096 4.63026ZM26.8003 4.70918C26.8576 4.74867 26.9059 4.79985 26.9419 4.85935L27.7971 4.34105C27.6878 4.16069 27.5415 4.00555 27.3679 3.88586L26.8003 4.70918ZM26.9419 4.85935C26.978 4.91885 27.001 4.98532 27.0095 5.05437L28.002 4.9322C27.9763 4.72288 27.9064 4.52141 27.7971 4.34105L26.9419 4.85935ZM1.77574 22.4977C1.74966 22.4559 1.73047 22.395 1.73047 22.3115H0.730469C0.730469 22.5464 0.784833 22.7987 0.927421 23.0272L1.77574 22.4977ZM3.80739 22.3241C3.80739 22.4022 3.78941 22.4721 3.76109 22.525L4.64258 22.9972C4.75702 22.7836 4.80739 22.5484 4.80739 22.3241H3.80739Z"
      fill="#044C5A"
    />
    <path
      d="M3.07715 23.8916L9.5 23.907L12 23.907"
      stroke="#044C5A"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <circle cx="19" cy="20" r="7" fill="#FF8C00" />
    <path
      d="M14.0502 15.0502C15.3724 13.7281 17.1302 13 19 13C20.8698 13 22.6276 13.7281 23.9498 15.0502C25.2719 16.3724 26 18.1302 26 20C26 21.8698 25.2719 23.6276 23.9498 24.9498C22.6276 26.2719 20.8698 27 19 27C17.1302 27 15.3724 26.2719 14.0502 24.9498C12.7281 23.6276 12 21.8698 12 20C12 18.1302 12.7281 16.3724 14.0502 15.0502ZM19 26.1797C22.4075 26.1797 25.1797 23.4075 25.1797 20C25.1797 16.5925 22.4075 13.8203 19 13.8203C15.5925 13.8203 12.8203 16.5925 12.8203 20C12.8203 23.4075 15.5925 26.1797 19 26.1797Z"
      fill="#FF8C00"
    />
    <path
      d="M18.6714 22.2583V20.8262C18.2248 20.6986 17.8966 20.506 17.687 20.2485C17.4797 19.9888 17.376 19.6743 17.376 19.3052C17.376 18.9315 17.4933 18.6182 17.728 18.3652C17.965 18.11 18.2795 17.9631 18.6714 17.9243V17.5859H19.167V17.9243C19.5293 17.9676 19.8175 18.0918 20.0317 18.2969C20.2459 18.4997 20.3826 18.772 20.4419 19.1138L19.5771 19.2266C19.5247 18.9577 19.388 18.7754 19.167 18.6797V20.0161C19.7139 20.1642 20.0864 20.3568 20.2847 20.5938C20.4829 20.8285 20.582 21.1304 20.582 21.4995C20.582 21.9119 20.4567 22.2594 20.2061 22.542C19.9577 22.8245 19.6113 22.9977 19.167 23.0615V23.7007H18.6714V23.0786C18.2772 23.0308 17.957 22.8838 17.7109 22.6377C17.4648 22.3916 17.3076 22.0441 17.2393 21.5952L18.1313 21.4995C18.1678 21.6818 18.2362 21.839 18.3364 21.9712C18.4367 22.1034 18.5483 22.1991 18.6714 22.2583ZM18.6714 18.6694C18.5369 18.715 18.4299 18.7925 18.3501 18.9019C18.2703 19.0112 18.2305 19.132 18.2305 19.2642C18.2305 19.3849 18.2669 19.4977 18.3398 19.6025C18.4128 19.7051 18.5233 19.7882 18.6714 19.8521V18.6694ZM19.167 22.3062C19.3379 22.2743 19.4769 22.1956 19.584 22.0703C19.6911 21.9427 19.7446 21.7935 19.7446 21.6226C19.7446 21.4699 19.6991 21.3389 19.6079 21.2295C19.519 21.1178 19.3721 21.0324 19.167 20.9731V22.3062Z"
      fill="white"
    />
  </svg>
);

const TotalPaidIcon = () => (
  <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.8731 22.6828C27.9804 22.9096 27.9804 21.8999 27.9804 21.8999V6.96575C28.0901 5.85355 27.1243 5.85355 27.1243 5.85355H5.51698C5.41228 5.84395 5.30682 5.85985 5.2096 5.89987C5.11239 5.9399 5.02631 6.00287 4.95872 6.0834C4.89113 6.16393 4.84405 6.25963 4.82149 6.36231C4.79893 6.465 4.80156 6.57162 4.82917 6.67306V21.3804C3.40966 24.3072 1.90234 21.3804 1.90234 21.3804V2.7877C1.90234 2.7877 1.98283 1.8877 2.80234 1.8877H10.4633L12.1462 3.86331H26.1292C26.2604 3.88734 26.385 3.93891 26.4948 4.01462C26.6047 4.09033 26.6972 4.18846 26.7663 4.30254C26.8355 4.41661 26.8796 4.54405 26.8959 4.67644C26.9122 4.80884 26.9003 4.94318 26.8609 5.07062"
      stroke="#044C5A"
      strokeMiterlimit="10"
    />
    <path d="M3.65918 22.6533L13.9763 22.668H14.2324" stroke="#044C5A" strokeMiterlimit="10" />
    <path
      d="M22.4922 21.2636L23.2239 24.3953C23.2361 24.4592 23.2296 24.5253 23.205 24.5856C23.1805 24.6458 23.139 24.6977 23.0855 24.7349C23.0321 24.772 22.9691 24.7929 22.904 24.795C22.839 24.797 22.7747 24.7802 22.719 24.7465L20.019 23.0124C19.9662 22.98 19.9054 22.9629 19.8434 22.9629C19.7815 22.9629 19.7207 22.98 19.6678 23.0124L16.8946 24.6587C16.8385 24.6931 16.7733 24.71 16.7075 24.707C16.6417 24.704 16.5783 24.6813 16.5255 24.6419C16.4727 24.6025 16.433 24.5482 16.4114 24.486C16.3898 24.4237 16.3874 24.3565 16.4044 24.2928L17.2166 21.2197C17.2314 21.1595 17.2297 21.0965 17.2117 21.0373C17.1936 20.978 17.16 20.9248 17.1142 20.8831L14.6922 18.7758C14.6434 18.7318 14.6086 18.6745 14.592 18.611C14.5754 18.5474 14.5777 18.4804 14.5987 18.4182C14.6197 18.356 14.6585 18.3013 14.7102 18.2608C14.7619 18.2203 14.8243 18.1958 14.8898 18.1904L18.0946 18.0075C18.1562 18.0021 18.2152 17.9803 18.2655 17.9442C18.3157 17.9082 18.3552 17.8593 18.38 17.8026L19.6385 14.8758C19.664 14.8143 19.7072 14.7617 19.7625 14.7247C19.8179 14.6877 19.8829 14.668 19.9495 14.668C20.0161 14.668 20.0812 14.6877 20.1365 14.7247C20.1919 14.7617 20.235 14.8143 20.2605 14.8758L21.4239 17.8611C21.4489 17.9183 21.4884 17.9679 21.5384 18.0051C21.5885 18.0423 21.6474 18.0658 21.7093 18.0733L24.8776 18.2928C24.9436 18.2975 25.0068 18.3219 25.0587 18.363C25.1107 18.4041 25.1491 18.4599 25.1688 18.5231C25.1886 18.5863 25.1888 18.654 25.1695 18.7174C25.1502 18.7807 25.1122 18.8368 25.0605 18.8782L22.5727 20.9197C22.5272 20.9629 22.4954 21.0185 22.4811 21.0796C22.4668 21.1407 22.4706 21.2047 22.4922 21.2636Z"
      fill="#FF8C00"
      stroke="#FF8C00"
      strokeMiterlimit="10"
    />
  </svg>
);

const TotalToBePaid = () => (
  <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M26.5535 23.5029C26.279 23.4733 26.0324 23.6719 26.0029 23.9465C25.9733 24.221 26.1719 24.4676 26.4465 24.4971L26.5535 23.5029ZM28.6459 23.1H28.1459V23.1152L28.1468 23.1305L28.6459 23.1ZM28.6459 7.39999L28.1481 7.35273L28.1459 7.3763V7.39999H28.6459ZM27.7459 6.22306V6.72306H27.7553L27.7648 6.7227L27.7459 6.22306ZM5.03047 6.22306L4.98483 6.72097L5.0076 6.72306H5.03047V6.22306ZM4.30739 7.0846H4.80739V7.01778L4.78984 6.9533L4.30739 7.0846ZM1.23047 3.00768L0.732456 2.96314L0.730469 2.98536V3.00768H1.23047ZM10.2305 2.06152L10.6111 1.73729L10.4614 1.56152H10.2305V2.06152ZM11.9997 4.13845L11.6191 4.46268L11.7688 4.63845H11.9997V4.13845ZM26.6997 4.13845L26.7898 3.64663L26.7451 3.63845H26.6997V4.13845ZM27.0095 5.05437C27.0433 5.32844 27.2928 5.52328 27.5669 5.48954C27.841 5.4558 28.0358 5.20627 28.002 4.9322L27.0095 5.05437ZM1.35158 22.7624L1.77574 22.4977L1.35158 22.7624ZM4.20184 22.7611L4.64258 22.9972L4.20184 22.7611ZM26.4465 24.4971C27.623 24.6238 28.3411 24.4016 28.754 23.9962C28.9572 23.7967 29.0572 23.5792 29.1045 23.4057C29.1279 23.3199 29.1384 23.2451 29.143 23.1879C29.1452 23.1591 29.146 23.1345 29.1461 23.1146C29.1461 23.1047 29.146 23.0959 29.1458 23.0884C29.1457 23.0846 29.1455 23.0811 29.1454 23.078C29.1453 23.0764 29.1452 23.0749 29.1452 23.0735C29.1451 23.0728 29.1451 23.0721 29.145 23.0714C29.145 23.0711 29.145 23.0706 29.145 23.0705C29.145 23.07 29.1449 23.0695 28.6459 23.1C28.1468 23.1305 28.1468 23.13 28.1467 23.1295C28.1467 23.1294 28.1467 23.1289 28.1467 23.1286C28.1466 23.128 28.1466 23.1275 28.1466 23.1269C28.1465 23.1257 28.1465 23.1247 28.1464 23.1236C28.1463 23.1216 28.1463 23.1198 28.1462 23.1181C28.1461 23.1149 28.1461 23.1125 28.1461 23.1108C28.1461 23.1075 28.1462 23.1071 28.1461 23.109C28.1457 23.1131 28.1444 23.1254 28.1397 23.1426C28.1308 23.1751 28.1097 23.2273 28.0534 23.2826C27.9472 23.3869 27.5924 23.6147 26.5535 23.5029L26.4465 24.4971ZM29.1459 23.1V7.39999H28.1459V23.1H29.1459ZM29.1436 7.44724C29.1789 7.07507 29.1315 6.75569 29.0061 6.48994C28.8792 6.22117 28.6885 6.04121 28.4946 5.92595C28.3058 5.81374 28.1182 5.7648 27.984 5.74269C27.9155 5.73142 27.8569 5.72646 27.8132 5.72436C27.7913 5.7233 27.7727 5.72296 27.7582 5.72293C27.751 5.72291 27.7447 5.72298 27.7395 5.72308C27.7368 5.72312 27.7345 5.72318 27.7324 5.72324C27.7313 5.72327 27.7304 5.7233 27.7295 5.72333C27.729 5.72335 27.7286 5.72336 27.7281 5.72338C27.7279 5.72338 27.7276 5.72339 27.7275 5.7234C27.7272 5.72341 27.7269 5.72342 27.7459 6.22306C27.7648 6.7227 27.7645 6.72271 27.7642 6.72272C27.7641 6.72273 27.7638 6.72274 27.7637 6.72274C27.7633 6.72276 27.763 6.72277 27.7626 6.72278C27.762 6.7228 27.7613 6.72282 27.7608 6.72284C27.7597 6.72287 27.7588 6.72289 27.7581 6.7229C27.7567 6.72293 27.7561 6.72293 27.7562 6.72293C27.7565 6.72293 27.7597 6.72294 27.7653 6.72321C27.7767 6.72375 27.7965 6.72529 27.8214 6.72939C27.874 6.73805 27.933 6.75546 27.9837 6.78556C28.0291 6.8126 28.0707 6.85091 28.1017 6.91676C28.1342 6.98563 28.1705 7.11721 28.1481 7.35273L29.1436 7.44724ZM27.7459 5.72306H5.03047V6.72306H27.7459V5.72306ZM5.07611 5.72515C4.88566 5.70769 4.69382 5.73661 4.51697 5.80942L4.89769 6.73411C4.92525 6.72276 4.95515 6.71825 4.98483 6.72097L5.07611 5.72515ZM4.51697 5.80942C4.34013 5.88223 4.18354 5.99677 4.0606 6.14326L4.82657 6.78613C4.84573 6.76331 4.87013 6.74545 4.89769 6.73411L4.51697 5.80942ZM4.0606 6.14326C3.93765 6.28975 3.852 6.46383 3.81096 6.65062L4.78767 6.8652C4.79406 6.83609 4.80741 6.80896 4.82657 6.78613L4.0606 6.14326ZM3.81096 6.65062C3.76992 6.83742 3.77472 7.03137 3.82494 7.2159L4.78984 6.9533C4.78202 6.92454 4.78127 6.89432 4.78767 6.8652L3.81096 6.65062ZM3.80739 7.0846V22.3241H4.80739V7.0846H3.80739ZM3.76109 22.525C3.48118 23.0475 3.23564 23.2729 3.06551 23.3624C2.91873 23.4397 2.79185 23.4361 2.65241 23.3801C2.49336 23.3163 2.32242 23.1825 2.15631 23.0028C1.99436 22.8276 1.86247 22.6366 1.77574 22.4977L0.927421 23.0272C1.03388 23.1977 1.20306 23.4448 1.42198 23.6816C1.63675 23.9139 1.9265 24.1663 2.27991 24.3081C2.65291 24.4579 3.09024 24.4795 3.53138 24.2473C3.94916 24.0273 4.31523 23.6083 4.64258 22.9972L3.76109 22.525ZM1.73047 22.3115V3.00768H0.730469V22.3115H1.73047ZM1.23047 3.00768C1.72848 3.05221 1.72846 3.05243 1.72844 3.05264C1.72844 3.05271 1.72842 3.05292 1.72841 3.05305C1.72838 3.05332 1.72836 3.05357 1.72834 3.05381C1.72829 3.05429 1.72825 3.05472 1.72821 3.0551C1.72814 3.05585 1.72809 3.05639 1.72805 3.05674C1.72798 3.05744 1.72798 3.05734 1.72808 3.05652C1.72828 3.05485 1.72885 3.05033 1.72993 3.04335C1.7321 3.02927 1.73621 3.00611 1.74321 2.97707C1.75772 2.91693 1.78196 2.84278 1.81955 2.77378C1.88666 2.65057 1.97725 2.56152 2.17662 2.56152V1.56152C1.51445 1.56152 1.13197 1.94555 0.941384 2.29542C0.850126 2.46296 0.799373 2.62534 0.77109 2.74261C0.756699 2.80227 0.747465 2.85304 0.741648 2.89069C0.738729 2.90959 0.736639 2.92539 0.735178 2.93758C0.734447 2.94369 0.733871 2.94891 0.733426 2.95318C0.733203 2.95532 0.733013 2.95723 0.732853 2.95889C0.732772 2.95972 0.7327 2.96049 0.732634 2.9612C0.732601 2.96155 0.732569 2.96189 0.73254 2.96221C0.732525 2.96238 0.732504 2.96261 0.732497 2.96269C0.732476 2.96292 0.732456 2.96314 1.23047 3.00768ZM2.17662 2.56152H10.2305V1.56152H2.17662V2.56152ZM9.84985 2.38576L11.6191 4.46268L12.3803 3.81421L10.6111 1.73729L9.84985 2.38576ZM11.9997 4.63845H26.6997V3.63845H11.9997V4.63845ZM26.6096 4.63026C26.678 4.6428 26.743 4.6697 26.8003 4.70918L27.3679 3.88586C27.1943 3.76616 26.9972 3.68462 26.7898 3.64663L26.6096 4.63026ZM26.8003 4.70918C26.8576 4.74867 26.9059 4.79985 26.9419 4.85935L27.7971 4.34105C27.6878 4.16069 27.5415 4.00555 27.3679 3.88586L26.8003 4.70918ZM26.9419 4.85935C26.978 4.91885 27.001 4.98532 27.0095 5.05437L28.002 4.9322C27.9763 4.72288 27.9064 4.52141 27.7971 4.34105L26.9419 4.85935ZM1.77574 22.4977C1.74966 22.4559 1.73047 22.395 1.73047 22.3115H0.730469C0.730469 22.5464 0.784833 22.7987 0.927421 23.0272L1.77574 22.4977ZM3.80739 22.3241C3.80739 22.4022 3.78941 22.4721 3.76109 22.525L4.64258 22.9972C4.75702 22.7836 4.80739 22.5484 4.80739 22.3241H3.80739Z"
      fill="#044C5A"
    />
    <path
      d="M3.07715 23.8916L13 23.907H13.5"
      stroke="#044C5A"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M24.2081 17.7617H16.1004C15.4716 17.7617 14.9619 18.2714 14.9619 18.9002V24.8617C14.9619 25.4905 15.4716 26.0002 16.1004 26.0002H24.2081C24.8368 26.0002 25.3465 25.4905 25.3465 24.8617V18.9002C25.3465 18.2714 24.8368 17.7617 24.2081 17.7617Z"
      fill="#FF8C00"
      stroke="#FF8C00"
      strokeMiterlimit="10"
    />
    <path
      d="M20.3698 13.0771C21.2695 13.0771 22.1324 13.4346 22.7686 14.0707C23.4048 14.7069 23.7622 15.5698 23.7622 16.4695V17.7848H16.9775V16.4464C16.9836 15.5507 17.3437 14.6938 17.9792 14.0626C18.6148 13.4314 19.4741 13.0771 20.3698 13.0771V13.0771Z"
      stroke="#FF8C00"
      strokeMiterlimit="10"
    />
    <path d="M20.862 20.6074H19.7773V23.4151H20.862V20.6074Z" fill="white" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="30" height="23" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.27637 21.0634C1.72408 21.0634 1.27637 20.6157 1.27637 20.0634V8.65918C1.27637 8.10689 1.72408 7.65918 2.27637 7.65918H9.25725C9.38821 7.65918 9.51395 7.71057 9.60743 7.80229L10.9528 9.12236C11.0463 9.21409 11.172 9.26547 11.303 9.26547H21.3402C21.8925 9.26547 22.3402 9.71319 22.3402 10.2655V20.0634C22.3402 20.6157 21.8925 21.0634 21.3402 21.0634H2.27637Z"
      fill="#FF8C00"
      stroke="#FF8C00"
      strokeMiterlimit="10"
    />
    <path
      d="M4.46777 5.87601V4.96777C4.46777 4.69163 4.69163 4.46777 4.96777 4.46777H11.8633C11.998 4.46777 12.127 4.5221 12.2211 4.61844L13.8147 6.25044C13.9088 6.34679 14.0378 6.40111 14.1725 6.40111H23.8933C24.4456 6.40111 24.8933 6.84883 24.8933 7.40111V18.0103C24.8933 18.2865 24.6694 18.5103 24.3933 18.5103H23.7279"
      stroke="#044C5A"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M7.02148 3.30088V2.41504C7.02148 2.1389 7.24534 1.91504 7.52148 1.91504H14.8619C14.9919 1.91504 15.1168 1.96569 15.2101 2.05624L16.6617 3.46503C16.755 3.55558 16.8799 3.60623 17.0099 3.60623H27.0853C27.6376 3.60623 28.0853 4.05395 28.0853 4.60623V14.8193C28.0853 15.0954 27.8615 15.3193 27.5853 15.3193H26.8107"
      stroke="#044C5A"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);