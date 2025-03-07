import { PathType } from "@shared/shared/common/path/path.dependency";

export const DiskToken = "LOCAL_DISK";
export const loadDisk = (argPath: PathType) => argPath.resolve('.disk');