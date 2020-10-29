{
  /* <div className='right'>
<Space>
  <Button
    type='primary'
    disabled={isTableDataPresent ? false : true}
    onClick={() => toggleTableVisibility()}
  >
    {isTableVisible ? 'Hide' : 'Show'} complete table
  </Button>
  <Button
    type='primary'
    onClick={() => toggleMarkersVisibility()}
    disabled={isTableDataPresent ? false : true}
  >
    {areMarkersVisible ? 'Hide' : 'Display'} markers
  </Button>
  <Button
    type='primary'
    onClick={() => toggleRouteVisibility()}
    disabled={isTableDataPresent ? false : true}
    loading={wayPointsLoading}
  >
    {isRouteVisible ? 'Hide' : 'Show'} complete route
  </Button>
  <Button
    type='primary'
    disabled={isTableDataPresent ? false : true}
    onClick={() => toggleTableVisibility()}
  >
    {isTableVisible ? 'Hide' : 'Show'} selected table
  </Button>
  <Button
    type='primary'
    onClick={() => toggleSelectedRouteVisibility()}
    disabled={isTableDataPresent ? false : true}
    loading={selectedWayPointsLoading}
  >
    {isSelectedRouteVisible ? 'Hide' : 'Show'} selected route
  </Button>
  <Button type='primary' onClick={() => fileDownloadHandler()}>
    Download Routes
  </Button>
</Space>

{isTableVisible && isTableDataPresent ? (
  <Table columns={tableColumns} dataSource={tableData} />
) : null}
</div>
//////////////////////

<div className='left'>
<Dragger
  name='file'
  onChange={(event) => fileUploadHandler(event)}
  beforeUpload={() => false}
  accept='.csv'
  fileList={fileList}
>
  <p className='ant-upload-drag-icon'>
    <InboxOutlined />
  </p>
  <p className='ant-upload-text'>Click or drag a file to this area to upload</p>
  <p className='ant-upload-hint'>
    File must contain a column with any of the following headers : Lat/Long , X/Y ,
    Latitude/Longitude , Easting/Northing
  </p>
</Dragger>
</div> */
}
