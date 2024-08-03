// React and PropTypes imports
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  useRef,
} from "react";
import PropTypes from "prop-types";

// Style imports
import {
  FilterButton,
  ColumnsContainer,
  AddTitleFilterContainer,
  BoardContainer,
  BoardHeader,
} from "./Board.styled";

// Component imports
import Column from "../Column/Column";
import AddColumnButton from "../AddColumnBtn/AddColumnBtn";
import FilterModal from "../../Portal/FilterModal/FilterModal";
import { FiFilter } from "react-icons/fi";

// Service imports
import ColumnService from "../../../service/columnService";
import BoardService from "../../../service/boardService";
import CardService from "../../../service/cardService";

// Context import
import { AuthContext } from "../../../contexts/AuthContext";

// Collaborators component
import Collaborators from "../Collaborators";

// Background images imports
import abstractSpheresD from "../../../assets/board-img/abstract-spheres-d.webp";
import abstractSpheresT from "../../../assets/board-img/abstract-spheres-t.webp";
import abstractSpheresM from "../../../assets/board-img/abstract-spheres-m.webp";
import balloonFestivalD from "../../../assets/board-img/BalloonFestival-d.webp";
import balloonFestivalT from "../../../assets/board-img/BalloonFestival-t.webp";
import balloonFestivalM from "../../../assets/board-img/BalloonFestival-m.webp";
import cherryBlossomTreeD from "../../../assets/board-img/CherryBlossomTree-d.webp";
import cherryBlossomTreeT from "../../../assets/board-img/CherryBlossomTree-t.webp";
import cherryBlossomTreeM from "../../../assets/board-img/CherryBlossomTree-m.webp";
import cloudySkyD from "../../../assets/board-img/CloudySky-d.webp";
import cloudySkyT from "../../../assets/board-img/CloudySky-t.webp";
import cloudySkyM from "../../../assets/board-img/CloudySky-m.webp";
import crescentMoonD from "../../../assets/board-img/CrescentMoon-d.webp";
import crescentMoonT from "../../../assets/board-img/CrescentMoon-t.webp";
import crescentMoonM from "../../../assets/board-img/CrescentMoon-m.webp";
import desertArchD from "../../../assets/board-img/DesertArch-d.webp";
import desertArchT from "../../../assets/board-img/DesertArch-t.webp";
import desertArchM from "../../../assets/board-img/DesertArch-m.webp";
import hotAirBalloonD from "../../../assets/board-img/HotAirBalloon-d.webp";
import hotAirBalloonT from "../../../assets/board-img/HotAirBalloon-t.webp";
import hotAirBalloonM from "../../../assets/board-img/HotAirBalloon-m.webp";
import milkyWayCampD from "../../../assets/board-img/MilkyWayCamp-d.webp";
import milkyWayCampT from "../../../assets/board-img/MilkyWayCamp-t.webp";
import milkyWayCampM from "../../../assets/board-img/MilkyWayCamp-m.webp";
import moonEclipseD from "../../../assets/board-img/moon-eclipse-d.webp";
import moonEclipseT from "../../../assets/board-img/moon-eclipse-t.webp";
import moonEclipseM from "../../../assets/board-img/moon-eclipse-m.webp";
import palmLeavesD from "../../../assets/board-img/PalmLeaves-d.webp";
import palmLeavesT from "../../../assets/board-img/PalmLeaves-t.webp";
import palmLeavesM from "../../../assets/board-img/PalmLeaves-m.webp";
import pinkFlowersD from "../../../assets/board-img/PinkFlowers-d.webp";
import pinkFlowersT from "../../../assets/board-img/PinkFlowers-t.webp";
import pinkFlowersM from "../../../assets/board-img/PinkFlowers-m.webp";
import rockyCoastD from "../../../assets/board-img/RockyCoast-d.webp";
import rockyCoastT from "../../../assets/board-img/RockyCoast-t.webp";
import rockyCoastM from "../../../assets/board-img/RockyCoast-m.webp";
import sailboatD from "../../../assets/board-img/Sailboat-d.webp";
import sailboatT from "../../../assets/board-img/Sailboat-t.webp";
import sailboatM from "../../../assets/board-img/Sailboat-m.webp";
import turquoiseBayD from "../../../assets/board-img/TurquoiseBay-d.webp";
import turquoiseBayT from "../../../assets/board-img/TurquoiseBay-t.webp";
import turquoiseBayM from "../../../assets/board-img/TurquoiseBay-m.webp";
import starryMountainsD from "../../../assets/board-img/StarryMountains-d.webp";
import starryMountainsT from "../../../assets/board-img/StarryMountains-t.webp";
import starryMountainsM from "../../../assets/board-img/StarryMountains-m.webp";

const backgrounds = {
  abstractSpheres: {
    desktop: abstractSpheresD,
    tablet: abstractSpheresT,
    mobile: abstractSpheresM,
  },
  balloonFestival: {
    desktop: balloonFestivalD,
    tablet: balloonFestivalT,
    mobile: balloonFestivalM,
  },
  cherryBlossomTree: {
    desktop: cherryBlossomTreeD,
    tablet: cherryBlossomTreeT,
    mobile: cherryBlossomTreeM,
  },
  cloudySky: {
    desktop: cloudySkyD,
    tablet: cloudySkyT,
    mobile: cloudySkyM,
  },
  crescentMoon: {
    desktop: crescentMoonD,
    tablet: crescentMoonT,
    mobile: crescentMoonM,
  },
  desertArch: {
    desktop: desertArchD,
    tablet: desertArchT,
    mobile: desertArchM,
  },
  hotAirBalloon: {
    desktop: hotAirBalloonD,
    tablet: hotAirBalloonT,
    mobile: hotAirBalloonM,
  },
  milkyWayCamp: {
    desktop: milkyWayCampD,
    tablet: milkyWayCampT,
    mobile: milkyWayCampM,
  },
  moonEclipse: {
    desktop: moonEclipseD,
    tablet: moonEclipseT,
    mobile: moonEclipseM,
  },
  palmLeaves: {
    desktop: palmLeavesD,
    tablet: palmLeavesT,
    mobile: palmLeavesM,
  },
  pinkFlowers: {
    desktop: pinkFlowersD,
    tablet: pinkFlowersT,
    mobile: pinkFlowersM,
  },
  rockyCoast: {
    desktop: rockyCoastD,
    tablet: rockyCoastT,
    mobile: rockyCoastM,
  },
  sailboat: {
    desktop: sailboatD,
    tablet: sailboatT,
    mobile: sailboatM,
  },
  turquoiseBay: {
    desktop: turquoiseBayD,
    tablet: turquoiseBayT,
    mobile: turquoiseBayM,
  },
  starryMountains: {
    desktop: starryMountainsD,
    tablet: starryMountainsT,
    mobile: starryMountainsM,
  },
};

const Board = ({ boardId, titleBoard, onCollaboratorUpdate}) => {
  const [columns, setColumns] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [background, setBackground] = useState(null);
  const { token } = useContext(AuthContext);
  const cardService = useMemo(() => new CardService(token), [token]);
  const boardService = useMemo(() => new BoardService(token), [token]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(null);
  const filterButtonRef = useRef(null);

  // Fetch board data
  const fetchBoardData = useCallback(async () => {
    try {
      const boardData = await boardService.getBoard(boardId);
      setColumns(boardData.columns);
      setCollaborators(boardData.collaborators);
      setBackground(boardData.background);
    } catch (error) {
      console.error("Failed to fetch board data:", error);
    }
  }, [boardId, boardService]);

  useEffect(() => {
    if (boardId) {
      fetchBoardData();
    }
  }, [boardId, fetchBoardData]);

  // Handle column addition
  const handleColumnAdded = (newColumn) => {
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterModalOpen(false);
  };

  // Handle card drop
  const onDrop = async (item, monitor) => {
    const { sourceColumnId, cardId } = item;
    const destinationColumnId = monitor.getDropResult()?.columnId;

    if (!destinationColumnId || sourceColumnId === destinationColumnId) {
      return;
    }

    try {
      await cardService.moveCard(
        boardId,
        sourceColumnId,
        cardId,
        destinationColumnId
      );
      fetchBoardData();
    } catch (error) {
      console.error("Error moving card:", error);
    }
  };

  const backgroundImageSet = backgrounds[background] || {};

  return (
    <BoardContainer $backgroundImage={backgroundImageSet}>
      <BoardHeader>
        <AddTitleFilterContainer>
          <h2>{titleBoard}</h2>
          <Collaborators collaborators={collaborators} />
        </AddTitleFilterContainer>

        <FilterButton
          ref={filterButtonRef}
          onClick={() => setIsFilterModalOpen(true)}
        >
          <FiFilter />
          Filters
        </FilterButton>
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onFilterChange={handleFilterChange}
          buttonRef={filterButtonRef}
        />
      </BoardHeader>

      <ColumnsContainer>
        {columns.map((column, index) => (
          <Column
            key={column._id}
            title={column.titleColumn}
            columnId={column._id}
            filter={filter}
            boardId={boardId}
            fetchColumns={fetchBoardData}
            setColumns={setColumns} 
            collaborators={collaborators} 
            index={index}
            onDrop={onDrop}
            columns={columns} 
          />
        ))}
        <AddColumnButton boardId={boardId} onColumnAdded={handleColumnAdded} />
      </ColumnsContainer>
    </BoardContainer>
  );
};

Board.propTypes = {
  boardId: PropTypes.string.isRequired,
  titleBoard: PropTypes.string.isRequired,
  onCollaboratorUpdate: PropTypes.func.isRequired,
};

export default Board;

